import os
import random
import shutil
import asyncio
import math
import time

from . import base
from . import roaches
from . import weather
from . import entry
from . import bets
from . import bought
from . import users

from ..classes.xmlib import XmlLib


def racestep(u):
    result = {}
    result["status"] = "state"

    races = entry.get()

    if len(races) == 0:        
        race = random.randint(4000,7000)
        rtime = 0
        gotrunned = 0
        
        for file in os.listdir(base.racepath):
            if ".xml" in file:
                xmlfile = XmlLib.xmlfile(base.racepath + file)
                h = XmlLib.xml_to_dict(xmlfile, "roach")
                races.append( {"time": rtime, "roach": h, "finish": False, "race": race, "gotrunned": gotrunned, "id": h["id"], "lasttime": 0})

    loop = asyncio.get_event_loop()
    races = loop.run_until_complete(raceallroaches(races, u))
    
    for r in races:
        if r["finish"]:    
            min = {}
            min["gotrunned"] = 0

            for r in races:
                if int(r["gotrunned"]) > int(min["gotrunned"]):
                    min = r

            for r in races:
                if r["id"] != min["roach"]["id"]:
                    raceout(r["id"])
                    roach = r["roach"]
                    roach["health"] = int(roach["health"]) - 1
                    roaches.save(roach)

            roaches.winner(min["roach"])
            result["winner"] = min
            winner = bets.winner(result["winner"], len(races))
            result["winner"] = winner
            result["status"] = "finished"
            entry.clear() 
            return result
        

    result["races"] = races
    return result

async def raceallroaches(races, u):
    tasks = []
    sem = asyncio.Semaphore(4)
    for h in races:
        task = asyncio.Task(raceoneroach(h, sem, u))
        tasks.append(task)
    return await asyncio.gather(*tasks)

async def raceoneroach(h, sem, u):
    nitroValue = 0

    ab = bets.all()
    for b in ab:
        if "id" in u and b["user"] == u["id"]:
            if int(h["roach"]["id"]) == int(b["roach"]["id"]):
                nitroValue = bought.getbuys(u)
                u["nitro"] = 0
                users.save(u)
    finish = False
    if int(h["gotrunned"]) <= int(h["race"]):
        q = 100 * int(h["roach"]["history"]) / (int(h["race"]) * int(h["roach"]["health"]))
        beforerunned = h["gotrunned"]
        h["gotrunned"] = int(h["gotrunned"]) + math.ceil(int(h["roach"]["speed"]) / int(h["roach"]["weight"])) + math.ceil(q) + math.ceil(weather.get()) + int(nitroValue)
        h["roach"]["history"] = int(h["roach"]["history"]) + 1
        h["time"] = int(h["time"]) + 1

        lasttime = time.time()
        delta = lasttime - float(h["lasttime"])
        print(delta)
        if delta >= 0.5:
            entry.save(h)
        else:
            h["gotrunned"] = beforerunned
        
        if int(h["gotrunned"]) > int(h["race"]):
            finish = True
    else:
        finish = True
    return {"id": h["roach"]["id"], "time": h["time"], "roach": h["roach"], "finish": finish, "race": h["race"], "gotrunned": h["gotrunned"], "lasttime": h["lasttime"]}

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

