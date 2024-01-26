import xml.etree.ElementTree as ET
from xml.dom import minidom
from typing import Union

from ..race import base

def xmlfile(file):
    with open(file, mode="r", encoding="utf-8") as f:
        root = ET.fromstring(f.read())
        return root

# product import file fields and config browse #

def browsefields(child, tag):
    if (child.tag == tag):
        return treefields(child)
    else:
        for chi in child:
            b = browsefields(chi, tag)
            if (b):
                return b
    return False

def treefields(child):
    fields = []
    for chi in child:
        fields.append(chi.tag)
    return fields

def browseconfig(attrib = False):
    tree = ET.parse(base.configcatalogpath)
    root = tree.getroot()
    fields = []
    attribs = {}
    for chi in root:
        if (chi.attrib and ("client-path" in chi.attrib)):
            if attrib:
                attribs[chi.attrib["client-path"]] = chi.text
            else:
                fields.append(chi.text)
        if (chi.attrib and ("setup" in chi.attrib)):
            if attrib:
                attribs[chi.attrib["setup"]] = chi.text
    if attrib:
        return attribs
    return fields
    
def getconfig():    
    configfile = xmlfile(base.configcatalogpath)    
    catalog = xml_to_dict(configfile, "catalog")
    return catalog

# xml files works #

def xmlout(xmlstr):
    prettyxmlstr = minidom.parseString(xmlstr).toprettyxml(indent="   ")
    return prettyxmlstr

def writefile(file, xml):
    xmlstr = xmlout(xml)
    with open(file, mode="w", encoding="utf-8") as f:
        f.write(xmlstr)

#  one level xml file conversions #

def object_to_xmlstr(data: Union[dict, bool], root='object'):
    xml = f'<{root}>'
    if isinstance(data, dict):
        for key, value in data.items():
            xml += object_to_xmlstr(value, key)
    elif isinstance(data, (list, tuple, set)):
        for item in data:
            xml += object_to_xmlstr(item, 'item')
    else:
        xml += str(data)

    xml += f'</{root}>'
    return xml

def xml_to_dict(child, tag):
    objs = []
    if (child.tag == tag):
        return treevalues(child)
    else:
        for chi in child:
            objs.append(xml_to_dict(chi, tag))
    return objs

def treevalues(child):
    o = {}
    for chi in child:
        o[chi.tag] = pretext(chi.text)
    return o

def pretext(text):
    return text.replace("\n","").strip()
