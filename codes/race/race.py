import os
import random
import shutil
import asyncio
import math

from . import base
from . import roaches
from . import weather
from . import entry

from ..classes.xmlib import XmlLib

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
                xmlfile = XmlLib.xmlfile(base.racepath + file)
                h = XmlLib.xml_to_dict(xmlfile, "roach")
                races.append( {"time": time, "roach": h, "finish": False, "race": race, "gotrunned": gotrunned, "id": h["id"]})

    loop = asyncio.get_event_loop()
    races = loop.run_until_complete(raceallroaches(races))
    
    for r in races:
        if r["finish"]:    
            min = {}
            min["time"] = 9999999

            for r in races:
                if int(r["time"]) < int(min["time"]):
                    min = r
            for r in races:
                if r["id"] != min["roach"]["id"]:
                    raceout(r["id"])
                    roach = r["roach"]
                    roach["health"] = int(roach["health"]) - 1
                    roaches.save(roach)

            roaches.winner(min["roach"])
            result["winner"] = min
            result["status"] = "finished"
            entry.clear() 
            return result;
        
    entry.save(races)
    result["races"] = races
    return result

async def raceallroaches(races):
    tasks = []
    sem = asyncio.Semaphore(4)
    for h in races:
        task = asyncio.Task(raceoneroach(h, sem))
        tasks.append(task)
    return await asyncio.gather(*tasks)

async def raceoneroach(h, sem):
    finish = False
    if int(h["gotrunned"]) <= int(h["race"]):
        q = 100 * int(h["roach"]["history"]) / (int(h["race"]) * int(h["roach"]["health"]))
        h["gotrunned"] = int(h["gotrunned"]) + math.ceil(int(h["roach"]["speed"]) / int(h["roach"]["weight"])) + math.ceil(q) + math.ceil(weather.get())
        h["roach"]["history"] = int(h["roach"]["history"]) + 1
        h["time"] = int(h["time"]) + 1
    else:
        finish = True
    return {"id": h["roach"]["id"], "time": h["time"], "roach": h["roach"], "finish": finish, "race": h["race"], "gotrunned": h["gotrunned"]}

def racein(hid):
    roachfile = base.roachespath + str(hid) + ".xml"
    roachracefile = base.racepath + str(hid) + ".xml"
    shutil.move(roachfile, roachracefile)
    return roaches.getroach(hid)

def raceout(hid):    
    roachfile = base.roachespath + str(hid) + ".xml"
    roachracefile = base.racepath + str(hid) + ".xml"
    shutil.move(roachracefile, roachfile)
    return roaches.getroach(hid)

