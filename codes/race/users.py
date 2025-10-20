import random
import os
import datetime

from operator import attrgetter

from bottle import request, response

from ..classes.xmlib import XmlLib
from . import base
from . import tools

def login(data):    
    useremail = data["email"]
    if useremail == None:
        u = {}
        u["id"] = random.randint(1000000, 9999999)
        u["email"] = tools.getname()
        u["money"] = 1000
    else:
        uxml = get(useremail)
        if uxml is not False: 
            u = uxml
        else:
            u = {}
            u["id"] = random.randint(1000000, 9999999)
            u["email"] = useremail
            u["money"] = 1000

    tools.setcookies("user", u["email"])

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

def save(u):     
    userxmlstr = XmlLib.object_to_xmlstr(u, "user")
    XmlLib.writefile(base.userspath + str(u["id"]) + ".xml", userxmlstr)
    return u  

def getbyid(id): 
    for file in os.listdir(base.userspath):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.userspath + file)            
            u = XmlLib.xml_to_dict(xmlfile, "user")
            if u["id"] == id:
                return u 
    return False    

def uglify(email):
    s = [*email]
    l = len(email)
    for i in range(0, int(abs(l/2.5))):
        j = random.choice(range(0,l))
        s[j] = "*"
    return "".join(s)

def top():
    users = []
    top = []
    count = 0

    for file in os.listdir(base.userspath):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.userspath + file)            
            u = XmlLib.xml_to_dict(xmlfile, "user")
            users.append(u)

    users = sorted(users, key=lambda student: int(student["money"]), reverse=True)

    for u in users:
        if count < 3:
            user = {}
            user["email"] = uglify(u["email"])
            user["money"] = u["money"]
            top.append(user)
            count = count + 1


    return top