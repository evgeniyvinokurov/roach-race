import os
import random
import shutil
import asyncio
import math

from ..race import base
from ..race import xmlib
from ..race import horses
from ..race import weather
from ..race import entry

def racestep():
    result = {}
    result["status"] = "state"

    races = entry.get()

    if len(races) == 0:        
        race = random.randint(4000,7000)
        time = 0
        gotrunned = 0
        
        for file in os.listdir(base.racepath):
            if ".xml" in file:
                xmlfile = xmlib.xmlfile(base.racepath + file)
                h = xmlib.xml_to_dict(xmlfile, "horse")
                races.append( {"time": time, "horse": h, "finish": False, "race": race, "gotrunned": gotrunned, "id": h["id"]})

    loop = asyncio.get_event_loop()
    races = loop.run_until_complete(raceallhorses(races))
    
    for r in races:
        if r["finish"]:    
            min = {}
            min["time"] = 9999999

            for r in races:
                if int(r["time"]) < int(min["time"]):
                    min = r
            for r in races:
                if r["id"] != min["horse"]["id"]:
                    raceout(r["id"])
                    horse = r["horse"]
                    horse["health"] = int(horse["health"]) - 1
                    horses.save(horse)

            horses.winner(min["horse"])
            result["winner"] = min
            result["status"] = "finished"
            entry.clear() 
            return result;
        
    entry.save(races)
    result["races"] = races
    return result

async def raceallhorses(races):
    tasks = []
    sem = asyncio.Semaphore(4)
    for h in races:
        task = asyncio.Task(raceonehorse(h, sem))
        tasks.append(task)
    return await asyncio.gather(*tasks)

async def raceonehorse(h, sem):
    finish = False
    if int(h["gotrunned"]) <= int(h["race"]):
        q = 100 * int(h["horse"]["history"]) / (int(h["race"]) * int(h["horse"]["health"]))
        h["gotrunned"] = int(h["gotrunned"]) + math.ceil(int(h["horse"]["speed"]) / int(h["horse"]["weight"])) + math.ceil(q) + math.ceil(weather.get())
        h["horse"]["history"] = int(h["horse"]["history"]) + 1
        h["time"] = int(h["time"]) + 1
    else:
        finish = True
    return {"id": h["horse"]["id"], "time": h["time"], "horse": h["horse"], "finish": finish, "race": h["race"], "gotrunned": h["gotrunned"]}

def racein(hid):
    horsefile = base.horsespath + str(hid) + ".xml"
    horseracefile = base.racepath + str(hid) + ".xml"
    shutil.move(horsefile, horseracefile)
    return horses.gethorse(hid)

def raceout(hid):    
    horsefile = base.horsespath + str(hid) + ".xml"
    horseracefile = base.racepath + str(hid) + ".xml"
    shutil.move(horseracefile, horsefile)
    return horses.gethorse(hid)

