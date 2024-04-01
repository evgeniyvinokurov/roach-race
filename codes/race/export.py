import json
import os

from . import base

from ..classes.xmlib import XmlLib

def all():
    jsonstr = "{ \"roaches\": ["
    count = 0
    
    for file in os.listdir(base.roachespath):
        if ".xml" in file:
            xmlfile = XmlLib.xmlfile(base.roachespath + file)
            l = XmlLib.xml_to_dict(xmlfile, "roach")

            if (count != 0):
                jsonstr += ","
            jsonstr += json.dumps(l)
            count += 1
    jsonstr += "], \"race\":["

    count = 0
    for file in os.listdir(base.racepath):
        if ".xml" in file:
            xmlfile = XmlLib.xmlfile(base.racepath + file)
            l = XmlLib.xml_to_dict(xmlfile, "roach")

            if (count != 0):
                jsonstr += ","
            jsonstr += json.dumps(l)
            count += 1
                
    jsonstr += "]}"
    return jsonstr

    