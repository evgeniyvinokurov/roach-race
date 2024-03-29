import os
import random

from ..race import base
from ..race import xmlib
from ..race import tools

def getnewhorse():
    h = {}

    h["id"] = random.randint(10000,99999)
    h["weight"] = random.randint(70,100)
    h["speed"] = random.randint(700,900)
    h["history"] = 0
    h["health"] = random.randint(80,99)
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

def save(horse):
    file = base.horsespath + str(horse["id"]) + ".xml"
    xmlstr = xmlib.object_to_xmlstr(horse, "horse")
    xmlib.writefile(file, xmlstr)

def winner(horse):
    file = base.racepath + str(horse["id"]) + ".xml"
    horse["health"] = int(horse["health"]) + 1
    if (horse["health"] >= 100):
        horse["health"] = 100
    xmlstr = xmlib.object_to_xmlstr(horse, "horse")
    xmlib.writefile(file, xmlstr)
