import os

from ..race import base
from ..race import xmlib
from . import roaches

def save(races):
    for r in races:
        entry = {}
        entry["race"] = r["race"]
        entry["time"] = r["time"]
        entry["gotrunned"] = r["gotrunned"]
        entry["id"] = r["id"]            
        file = base.entriespath + str(r["roach"]["id"]) + ".xml"
        xmlstr = xmlib.object_to_xmlstr(entry, "entry")
        xmlib.writefile(file, xmlstr)

def get():
    entries = []
    for file in os.listdir(base.entriespath):
        if ".xml" in file:
            xmlfile = xmlib.xmlfile(base.entriespath + file)
            h = xmlib.xml_to_dict(xmlfile, "entry")
            h["roach"] = roaches.getroach(h["id"])
            entries.append(h)    
    return entries

def clear():
    for file in os.listdir(base.entriespath):
        if ".xml" in file:
            os.unlink(base.entriespath + file)