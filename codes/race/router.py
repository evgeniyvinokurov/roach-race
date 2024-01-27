from bottle import redirect, route, view, post, request, get, response, auth_basic
from bottle import static_file

import json

from ..race import export
from ..race import horses
from ..race import race
from ..race import entry


@route('/race/')
@view('race')
def catalog(name='World'):
    entries = entry.get()
    param = {}
    if len(entries) != 0:
        param["started"] = True
    else:
        param["started"] = False
    return param   

@post('/horses/get/')
def gethorse():
    horse = horses.getnewhorse()
    return "{ \"status\": \"ok\", \"horse\":" + json.dumps(horse) + "}"

@post('/horses/race/')
def racemain():
    state = race.racestep()

    if state["status"] == "finished":
        return "{ \"status\": \"finished\", \"winner\":" + json.dumps(state["winner"]) + "}"
    else:
        return "{ \"status\": \"state\", \"state\":" + json.dumps(state["races"]) + "}"
    
@post('/horses/out/')
def horses_out():
    return export.all()

@post('/horses/race/in/<horseid>/')
def racein(horseid):
    h = race.racein(horseid) 
    return "{ \"status\": \"ok\", \"horse\": " + json.dumps(h) + "}"

@post('/horses/race/out/<horseid>/')
def racein(horseid):
    h = race.raceout(horseid) 
    return "{ \"status\": \"ok\", \"horse\": " + json.dumps(h) + "}"

    

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
