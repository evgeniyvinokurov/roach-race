import random
import os

from ..classes.xmlib import XmlLib

from . import base
from . import users
from . import roaches

def all():
    bets = []

    for file in os.listdir(base.betspath):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.betspath + file)           
            b = XmlLib.xml_to_dict(xmlfile, "bet")  
            b["roach"] = roaches.getroach(b["roach"])
            bets.append(b)
    
    return bets

def bet(b):    
    bet = {}

    bet["id"] = random.randint(1000000, 9999999)
    bet["user"] = b["user"]    
    bet["roach"] = b["roach"]    
    bet["bet"] = b["bet"]

    betxmlstr = XmlLib.object_to_xmlstr(bet, "bet")
    XmlLib.writefile(base.betspath + str(bet["id"]) + ".xml", betxmlstr)

    return "ok"

def winner(winner, count):
    roachwinner = winner

    for file in os.listdir(base.betspath):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.betspath + file)            
            b = XmlLib.xml_to_dict(xmlfile, "bet")
            user = users.getbyid(b["user"])

            if b["roach"] == winner["id"]:
                if b["bet"] == "all":
                    user["money"] = int(user["money"]) * count
                else:
                    user["money"] = int(user["money"]) + int(b["bet"]) * (count -1)
                roachwinner["user"] = user

                userxmlstr = XmlLib.object_to_xmlstr(user, "user")
                XmlLib.writefile(base.userspath + str(user["id"]) + ".xml", userxmlstr)
            else:
                if b["bet"] == "all":
                    user["money"] = 0
                else:
                    user["money"] = int(user["money"]) - int(b["bet"])
                roachwinner["user"] = user
                
                userxmlstr = XmlLib.object_to_xmlstr(user, "user")
                XmlLib.writefile(base.userspath + str(user["id"]) + ".xml", userxmlstr)

    
    for file in os.listdir(base.betspath):
        os.remove(base.betspath + file)

                
    return roachwinner    