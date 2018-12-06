import re

inputFile = 'file.json'
outputFile = 'file.csv'

# open file

f = open(inputFile,'r')
newData = f.read()
f.close()

# clear unwanted spaces
newData = re.sub(' [ ]+?([^ ])', r' \1', newData, flags=re.M)
newData = re.sub('^ ', r'', newData, flags=re.M)
newData = re.sub(' $', r'', newData, flags=re.M)

# convert json to tsv
newData = re.sub('}\n\]', r'},\n-|\n', newData, flags=re.M)

# convert json to tsv
newData = re.sub('{\n"bNo": ([0-9]+?),\n"cNo": ([0-9]+?),\n"vText": "(.*?)",\n"vNo": ([0-9]+?)\n},', r'\1\t\2\t\4\t\3', newData, flags=re.M)
newData = re.sub('^0\t0\t0\t.*?\n', r'', newData, flags=re.M)

# separate chapters
newData = re.sub('^([0-9]+?)\t([0-9]+?)\t1\t', r'-|\n\1\t\2\t1\t', newData, flags=re.M)
newData = re.sub('\[\n-\|', r'-|', newData, flags=re.M)

# format verse number
newData = re.sub('^([0-9]+?)\t([0-9]+?)\t([0-9]+?)\t', r'<vid id="v\1.\2.\3" onclick="luV(\3)">\3</vid>', newData, flags=re.M)

# format paragraph
newData = re.sub('( ¶|¶ )', r'¶', newData, flags=re.M)
newData = re.sub('( §|§ )', r'§', newData, flags=re.M)
newData = re.sub('( †|† )', r'†', newData, flags=re.M)
newData = re.sub('( ‡|‡ )', r'‡', newData, flags=re.M)
newData = re.sub(' [ ]+?([^ ])', r' \1', newData, flags=re.M)
newData = re.sub('¶[¶]+?([^¶])', r'¶\1', newData, flags=re.M)
newData = re.sub('§[§]+?([^§])', r'§\1', newData, flags=re.M)
newData = re.sub('†[†]+?([^†])', r'†\1', newData, flags=re.M)
newData = re.sub('‡[‡]+?([^‡])', r'‡\1', newData, flags=re.M)
newData = re.sub('(§¶|¶§)', r'¶', newData, flags=re.M)

p = re.compile('(<vid.*?</vid>)(【.*?】|¶|§|†|‡)', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\2\1', newData)
    s = p.search(newData)

newData = re.sub('</vid>', r'</vid> ', newData, flags=re.M)
newData = re.sub('¶', r'<br><br>', newData, flags=re.M)
newData = re.sub('§', r'<br>', newData, flags=re.M)
newData = re.sub('†', r'<br><br>&emsp;&emsp;', newData, flags=re.M)
newData = re.sub('‡', r'<br>&emsp;&emsp;', newData, flags=re.M)

newData = re.sub('【(.*?)】', r'<br><br><u><b>\1</b></u>', newData, flags=re.M)
newData = re.sub('^-\|\n<br><br>', r'-|\n', newData, flags=re.M)
newData = re.sub('</b></u><br><br><br><u><b>', r'</b></u><br><u><b>', newData, flags=re.M)
newData = re.sub('</b></u><br><br><u><b>', r'</b></u><br><u><b>', newData, flags=re.M)

# removed unwanted linebreaks
newData = re.sub('( <br>|<br> )', r'<br>', newData, flags=re.M)

p = re.compile('<br><br><br>', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'<br><br>', newData)
    s = p.search(newData)

p = re.compile('<br>\n<br><br>', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\n<br><br>', newData)
    s = p.search(newData)

p = re.compile('<br><br>\n<br>', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'<br><br>\n', newData)
    s = p.search(newData)

p = re.compile('\n\n', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\n', newData)
    s = p.search(newData)

newData = re.sub('^\-\|\n', r'', newData, flags=re.M)
newData = re.sub('^(.+?)$', r'<verse>\1</verse> ', newData, flags=re.M)
newData = re.sub('^(.*?<vid id="v)([0-9]+?)\.([0-9]+?)\.', r'\2\t\3\t\1\2.\3.', newData, flags=re.M)

p = re.compile(r'^([0-9]+?\t[0-9]+?\t)(.*?)\n\1', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\1\2', newData)
    s = p.search(newData)

# close file

f = open(outputFile,'w')
f.write(newData)
f.close()
