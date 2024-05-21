import random
import os

from ..classes.xmlib import XmlLib
from . import base

def login(user):
    u = {}
    u["id"] = random.randint(1000000, 9999999)
    u["email"] = user["email"]
    u["money"] = 1000

    uxml = get(u["email"])
    if uxml is not False:
        return uxml

    userxmlstr = XmlLib.object_to_xmlstr(u, "user")
    XmlLib.writefile(base.userspath + str(u["id"]) + ".xml", userxmlstr)
    return u

def get(email): 
    for file in os.listdir(base.userspath):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.userspath + file)            
            u = XmlLib.xml_to_dict(xmlfile, "user")
            if u["email"] == email:
                return u 
    return False    

def getbyid(id): 
    for file in os.listdir(base.userspath):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.userspath + file)            
            u = XmlLib.xml_to_dict(xmlfile, "user")
            if u["id"] == id:
                return u 
    return False    