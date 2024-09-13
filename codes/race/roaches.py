import os
import random

from . import base
from . import tools

from ..classes.xmlib import XmlLib

def getnewroach():
    h = {}

    h["id"] = random.randint(10000,99999)
    h["weight"] = random.randint(70,100)
    h["speed"] = random.randint(700,900)
    h["history"] = 0
    h["health"] = random.randint(80,99)
    h["number"] = random.randint(1,99)
    h["name"] = tools.getname()

    xmlstr = XmlLib.object_to_xmlstr(h, "roach")
    file = base.roachespath + str(h["id"]) + ".xml"
    XmlLib.writefile(file, xmlstr)

    return h

def getracecount():
    count = 0
    for file in os.listdir(base.racepath):
        if ".xml" in file:
            count = count + 1
            if count > 1: 
                return True
    return False

def getroach(hid):
    for file in os.listdir(base.roachespath):
        filexml = base.roachespath + str(hid) +".xml"
        if (hid +".xml") in file:
            h = XmlLib.xmlfile(filexml)
            hd = XmlLib.xml_to_dict(h, "roach")
            return hd

    for file in os.listdir(base.racepath):
        filexml = base.racepath + str(hid) +".xml"
        if (hid +".xml") in file:
            h = XmlLib.xmlfile(filexml)
            hd = XmlLib.xml_to_dict(h, "roach")
            return hd

def save(roach):
    file = base.roachespath + str(roach["id"]) + ".xml"
    xmlstr = XmlLib.object_to_xmlstr(roach, "roach")
    XmlLib.writefile(file, xmlstr)

def winner(roach):
    file = base.racepath + str(roach["id"]) + ".xml"
    roach["health"] = int(roach["health"]) + 1
    if (roach["health"] >= 100):
        roach["health"] = 100
    xmlstr = XmlLib.object_to_xmlstr(roach, "roach")
    XmlLib.writefile(file, xmlstr)
