from bottle import redirect, route, view, post, request, get, response, auth_basic
from bottle import static_file

import json

from . import export
from . import roaches
from . import race
from . import entry
from . import users
from . import bets
from . import shop
from . import bought


@route('/race/')
@view('race')
def catalog():
    entries = entry.get()
    param = {}
    param["top"] = users.top()
    if len(entries) != 0:
        if roaches.getracecount():
            param["started"] = True
        else:
            entries.clear()
            param["started"] = False
    else:
        param["started"] = False
    return param   

@route('/shop/')
@view('shop')
def shops():
    param = {}    
    return param   

@post('/shop/get/')
def getitems():
    items = shop.get()    
    return "{ \"status\": \"ok\", \"items\":" + json.dumps(items) + "}"

@post('/shop/buy/')
def buy():  
    b = {}
    for key, value in request.forms.allitems():
        b[key] = value
    result = shop.buy(b)    
    return "{ \"status\": \"ok\", \"result\":" + json.dumps(result) + "}"

@post('/roaches/get/')
def getroach():
    roach = roaches.getnewroach()
    return "{ \"status\": \"ok\", \"roach\":" + json.dumps(roach) + "}"

@post('/roaches/race/')
def racemain():
    if not roaches.getracecount():
        entry.clear()
        return "{ \"status\": \"finished\"}"

    u = {}
    user = {}
    
    for key, value in request.forms.allitems():
        u[key] = value

    if "nitro" in u:
        user = users.getbyid(u["nitro"])

    state = race.racestep(user)

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

@post('/raceuser/in/')
def user_in():
    b = {}
    for key, value in request.forms.allitems():
        b[key] = value
    user = users.login(b)
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
