from bottle import redirect, route, view, post, request, get, response, auth_basic
from bottle import static_file

import json
import os
import zipfile
import shutil

from ..race import export
from ..race import horses
from ..race import base


@route('/race/')
@view('race')
def catalog(name='World'):
    return dict()    

@post('/horses/get/')
def gethorse():
    horse = horses.getnewhorse()
    return "{ \"status\": \"ok\", \"horse\":" + json.dumps(horse) + "}"

@post('/horses/race/')
def gethorse():
    horsewinner = horses.race()
    return "{ \"status\": \"ok\", \"horsewinner\":" + json.dumps(horsewinner) + "}"
    
@post('/horses/out/')
def horses_out():
    return export.all()

@post('/horses/race/in/<horseid>/')
def racein(horseid):
    h = horses.racein(horseid) 
    return "{ \"status\": \"ok\", \"horse\": " + json.dumps(h) + "}"

@post('/horses/race/out/<horseid>/')
def racein(horseid):
    h = horses.raceout(horseid) 
    return "{ \"status\": \"ok\", \"horse\": " + json.dumps(h) + "}"

    

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
