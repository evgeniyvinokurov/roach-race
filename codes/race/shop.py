import os

from . import base
from . import bought

from ..classes.xmlib import XmlLib

def get():
    items = []

    for file in os.listdir(base.shopsitems):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.shopsitems + file)            
            i = XmlLib.xml_to_dict(xmlfile, "item")
            items.append(i)

    return items

def item(id):
    items = []

    for file in os.listdir(base.shopsitems):
        if ".xml" in file:            
            xmlfile = XmlLib.xmlfile(base.shopsitems + file)            
            i = XmlLib.xml_to_dict(xmlfile, "item")
            if id == i["id"]:
                return i

    return False


def buy(boughtitem):
    return bought.newbuy(boughtitem)