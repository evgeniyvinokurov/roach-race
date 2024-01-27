import os
import random
import shutil
import asyncio

from ..race import base
from ..race import xmlib
from ..race import horses
from ..race import weather

def race():
    loop = asyncio.get_event_loop()
    races = loop.run_until_complete(raceallhorses())
    min = {}
    min["time"] = 9999999
    for r in races:
        if r["time"] < min["time"]:
            min = r
    for r in races:
        if r["horse"]["id"] != min["horse"]["id"]:
            raceout(r["horse"]["id"])
            horse = r["horse"]
            horse["health"] = int(horse["health"]) - 1
            horses.save(horse)
    horses.winner(min["horse"])
    return min

async def raceallhorses():
    horseslist = []
    for file in os.listdir(base.racepath):
        if ".xml" in file:
            xmlfile = xmlib.xmlfile(base.racepath + file)
            h = xmlib.xml_to_dict(xmlfile, "horse")
            horseslist.append(h)
    tasks = []
    sem = asyncio.Semaphore(4)
    for h in horseslist:
        task = asyncio.Task(raceonehorse(h, sem))
        tasks.append(task)
    return await asyncio.gather(*tasks)


async def raceonehorse(h, sem):
    race = random.randint(7000,9000)
    gotrunned = 0
    time = 0
    while gotrunned <= race:
        q = 100 * int(h["history"]) / (race * int(h["health"]))
        gotrunned = gotrunned + int(h["speed"]) / int(h["weight"]) + q + weather.get()
        h["history"] = int(h["history"]) + 1
        time = time + 1
    return {"time": time, "horse": h}

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