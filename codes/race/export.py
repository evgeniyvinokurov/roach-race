import json
import os

from ..race import base
from ..race import xmlib

def all():
    jsonstr = "{ \"horses\": ["
    count = 0
    
    for file in os.listdir(base.horsespath):
        if ".xml" in file:
            xmlfile = xmlib.xmlfile(base.horsespath + file)
            l = xmlib.xml_to_dict(xmlfile, "horse")

            if (count != 0):
                jsonstr += ","
            jsonstr += json.dumps(l)
            count += 1
    jsonstr += "], \"race\":["

    count = 0
    for file in os.listdir(base.racepath):
        if ".xml" in file:
            xmlfile = xmlib.xmlfile(base.racepath + file)
            l = xmlib.xml_to_dict(xmlfile, "horse")

            if (count != 0):
                jsonstr += ","
            jsonstr += json.dumps(l)
            count += 1
                
    jsonstr += "]}"
    return jsonstr

    