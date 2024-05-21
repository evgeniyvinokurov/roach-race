from bottle import redirect, route, view, post, request, get, response, auth_basic
from bottle import static_file

import json

from . import export
from . import roaches
from . import race
from . import entry
from . import users
from . import bets


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

@post('/user/in/')
def user_in():
    u = {}
    for key, value in request.forms.allitems():
        u[key] = value
    user = users.login(u)
    return '{"user": ' + json.dumps(user) + '}'

@post('/bet/')
def bet():
    b = {}
    for key, value in request.forms.allitems():
        b[key] = value
    result = bets.bet(b)
    return '{"result": ' + json.dumps(result) + '}'

@post('/bets/')
def betsall():
    allbets = bets.all()
    return '{"bets": ' + json.dumps(allbets) + '}'

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
