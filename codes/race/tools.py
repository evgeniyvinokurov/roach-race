import argparse
import petname
import datetime

from bottle import request, response

def getname():
    parser = argparse.ArgumentParser(description="Generate human readable random names")
    parser.add_argument("-w", "--words", help="Number of words in name, default=2", default=2)
    parser.add_argument("-s", "--separator", help="Separator between words, default='-'", default="-")
    parser.options = parser.parse_args()
    return petname.Generate(int(parser.options.words), parser.options.separator)

def setcookies(cookiename, cookieval):
    expire_date = datetime.datetime.now() + datetime.timedelta(days=7)
    response.set_cookie(cookiename, cookieval, expires=expire_date, path='/')