import re
inputFile = 'TextMounce.json'
outputFile = 'Mounce.csv'
# open file
f = open(inputFile,'r')
newData = f.read()
f.close()
# clear unwanted spaces
newData = re.sub(' [ ]+?([^ ])', r' \1', newData, flags=re.M)
newData = re.sub('^ ', r'', newData, flags=re.M)
newData = re.sub(' $', r'', newData, flags=re.M)
# convert json to tsv
newData = re.sub('}\n\]', r'},', newData, flags=re.M)
# convert json to tsv
newData = re.sub('{\n"bNo": ([0-9]+?),\n"cNo": ([0-9]+?),\n"vText": "(.*?)",\n"vNo": ([0-9]+?)\n},', r'\1\t\2\t\4\t\3', newData, flags=re.M)
newData = re.sub('^0\t0\t0\t.*?\n', r'', newData, flags=re.M)
# remove formatting
newData = re.sub('^\[\n', r'', newData, flags=re.M)
newData = re.sub('<sup><a href=\'dict://[^\n<>]*?\'>[^\r<>]*?</a></sup>', r'', newData, flags=re.M)
newData = re.sub('<[^\n<>]*?>', r' ', newData, flags=re.M)
newData = re.sub('[¶§†‡]', r' ', newData, flags=re.M)
newData = re.sub('【(.*?)】', r' ', newData, flags=re.M)
newData = re.sub(r'\\"', r'"', newData, flags=re.M)
newData = re.sub('^([0-9]+?\t[0-9]+?\t[0-9]+?\t)', r'\1 ', newData, flags=re.M)
newData = re.sub('$', r' ', newData, flags=re.M)
# remove extra spaces
newData = re.sub(' [ ]+?([^ ])', r' \1', newData, flags=re.M)
newData = re.sub('^ $', r'', newData, flags=re.M)

p = re.compile('\n\n', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\n', newData)
    s = p.search(newData)
# close file
f = open(outputFile,'w')
f.write(newData)
f.close()
