from bottle import redirect, route, view, post, request, get, response, auth_basic
from bottle import static_file

import json

from . import export
from . import roaches
from . import race
from . import entry


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

@post('/roaches/get/')
def getroach():
    roach = roaches.getnewroach()
    return "{ \"status\": \"ok\", \"roach\":" + json.dumps(roach) + "}"

@post('/roaches/race/')
def racemain():
    state = race.racestep()

    if state["status"] == "finished":
        return "{ \"status\": \"finished\", \"winner\":" + json.dumps(state["winner"]) + "}"
    else:
        return "{ \"status\": \"state\", \"state\":" + json.dumps(state["races"]) + "}"
    
@post('/roaches/out/')
def roaches_out():
    return export.all()

@post('/roaches/race/in/<roachid>/')
def racein(roachid):
    h = race.racein(roachid) 
    return "{ \"status\": \"ok\", \"roach\": " + json.dumps(h) + "}"

@post('/roaches/race/out/<roachid>/')
def racein(roachid):
    h = race.raceout(roachid) 
    return "{ \"status\": \"ok\", \"roach\": " + json.dumps(h) + "}"

    

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
