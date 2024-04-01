import os

from . import base
from . import roaches

from ..classes.xmlib import XmlLib

def save(races):
    for r in races:
        entry = {}
        entry["race"] = r["race"]
        entry["time"] = r["time"]
        entry["gotrunned"] = r["gotrunned"]
        entry["id"] = r["id"]            
        file = base.entriespath + str(r["roach"]["id"]) + ".xml"
        xmlstr = XmlLib.object_to_xmlstr(entry, "entry")
        XmlLib.writefile(file, xmlstr)

def get():
    entries = []
    for file in os.listdir(base.entriespath):
        if ".xml" in file:
            xmlfile = XmlLib.xmlfile(base.entriespath + file)
            h = XmlLib.xml_to_dict(xmlfile, "entry")
            h["roach"] = roaches.getroach(h["id"])
            entries.append(h)    
    return entries

def clear():
    for file in os.listdir(base.entriespath):
        if ".xml" in file:
            os.unlink(base.entriespath + file)