import json
import os
import random
import shutil
import asyncio

from ..race import base
from ..race import xmlib
from ..race import tools

def getnewhorse():
    h = {}

    h["id"] = random.randint(10000,99999)
    h["weight"] = random.randint(70,100)
    h["speed"] = random.randint(700,900)
    h["history"] = random.randint(0,9999)
    h["health"] = random.randint(0,99)
    h["number"] = random.randint(1,99)
    h["name"] = tools.getname()

    xmlstr = xmlib.object_to_xmlstr(h, "horse")
    file = base.horsespath + str(h["id"]) + ".xml"
    xmlib.writefile(file, xmlstr)

    return h

def gethorse(hid):
    for file in os.listdir(base.horsespath):
        filexml = base.horsespath + str(hid) +".xml"
        if (hid +".xml") in file:
            h = xmlib.xmlfile(filexml)
            hd = xmlib.xml_to_dict(h, "horse")
            return hd

    for file in os.listdir(base.racepath):
        filexml = base.racepath + str(hid) +".xml"
        if (hid +".xml") in file:
            h = xmlib.xmlfile(filexml)
            hd = xmlib.xml_to_dict(h, "horse")
            return hd

def race():
    loop = asyncio.get_event_loop()
    races = loop.run_until_complete(raceallhorses())
    
    max = {}
    max["time"] = 0

    for r in races:
        if r["time"] > max["time"]:
            max = r

    for r in races:
        if r["horse"]["id"] != max["horse"]["id"]:
            raceout(r["horse"]["id"])

    return max

async def raceallhorses():
    horses = []
    for file in os.listdir(base.racepath):
        if ".xml" in file:
            xmlfile = xmlib.xmlfile(base.racepath + file)
            h = xmlib.xml_to_dict(xmlfile, "horse")
            horses.append(h)

    tasks = []
    sem = asyncio.Semaphore(4)

    for h in horses:
        task = asyncio.Task(raceonehorse(h, sem))
        tasks.append(task)

    return await asyncio.gather(*tasks)


async def raceonehorse(h, sem):
    race = random.randint(7000,9000)
    gotrunned = 0
    time = 0
    while gotrunned <= race:
        gotrunned = gotrunned + int(h["speed"]) / 60
        time = time + 1
    return {"time": time, "horse": h}

def history(h, race):
    h["history"] = 4352

def racein(hid):
    horsefile = base.horsespath + str(hid) + ".xml"
    horseracefile = base.racepath + str(hid) + ".xml"

    shutil.move(horsefile, horseracefile)

    return gethorse(hid)

def raceout(hid):    
    horsefile = base.horsespath + str(hid) + ".xml"
    horseracefile = base.racepath + str(hid) + ".xml"

    shutil.move(horseracefile, horsefile)
    return gethorse(hid)