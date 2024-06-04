import random
import os

from ..classes.xmlib import XmlLib

from . import base
from . import shop
from . import users

def newbuy(b):        
    item = shop.item(b["item"])
    user = users.getbyid(b["user"])
    if "nitro" not in user:
        user["nitro"] = 0
    user["nitro"] = int(user["nitro"]) + int(item["power"])

    return users.save(user)

def getbuys(u):          
    return int(u["nitro"]) if "nitro" in u else 0