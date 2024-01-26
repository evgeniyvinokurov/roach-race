import argparse
import petname

def getname():
    parser = argparse.ArgumentParser(description="Generate human readable random names")
    parser.add_argument("-w", "--words", help="Number of words in name, default=2", default=2)
    parser.add_argument("-s", "--separator", help="Separator between words, default='-'", default="-")
    parser.options = parser.parse_args()
    return petname.Generate(int(parser.options.words), parser.options.separator)