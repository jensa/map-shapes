import sys

filename = sys.argv[1]
content = ""

with open(filename) as f:
    content = f.readline()
print "Python fucked around with ", content;
