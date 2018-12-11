import re

inputFile = 'BibleIn.csv'
outputFile = 'Bible.csv'

# open file

f = open(inputFile,'r')
newData = f.read()
f.close()

# clear unwanted spaces

newData = re.sub('\n[\n]+?([^\n])', r'\n\1', newData, flags=re.M)

newData = re.sub('\A\n', r'', newData, flags=re.M)

newData = re.sub('^(.*?<vid id="v)([0-9]+?)\.([0-9]+?)\.', r'\2\t\3\t\1\2.\3.', newData, flags=re.M)

p = re.compile(r'^([0-9]+?\t)0\t(.*?\n)\1([0-9]+?\t)', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\1\3\2\1\3', newData)
    s = p.search(newData)

p = re.compile(r'^([0-9]+?\t[0-9]+?\t)(.*?)\n\1', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\1\2 ', newData)
    s = p.search(newData)

# close file

f = open(outputFile,'w')
f.write(newData)
f.close()
