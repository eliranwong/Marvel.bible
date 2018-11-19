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

# remove Introduction entry
newData = re.sub('^.*?\t0\t<a href=\'book.*?>Introduction</a>\n', r'', newData, flags=re.M)
newData = re.sub('<a href=\'book://[^\r<>\']*?\'>Introduction</a><hr>', r'', newData, flags=re.M)
newData = re.sub('<a href=\'book://[^\r<>\']*?\'>Introduction</a><br>', r'', newData, flags=re.M)

# remove duplicated and empty entries
newData = re.sub(r'^([0-9]+?\t[0-9]+?\t[0-9]+?\t)(.*?)\n\1$', r'\1\2', newData, flags=re.M)

# separate chapters
newData = re.sub('^([0-9]+?)\t([0-9]+?)\t0\t', r'-|\n\1\t\2\t0\t', newData, flags=re.M)
newData = re.sub('^([0-9]+?)\t([0-9]+?)\t1\t', r'-|\n\1\t\2\t1\t', newData, flags=re.M)
newData = re.sub('\[\n-\|', r'-|', newData, flags=re.M)
newData = re.sub('^([0-9]+?\t[0-9]+?\t0\t.*?)\n\-\|', r'\1', newData, flags=re.M)

# special treatment for commentary
newData = re.sub('^([0-9]+?\t[0-9]+?\t[0-9]+?\t)([^\n].*?)\n', r'\1\2<hr>\n', newData, flags=re.M)
newData = re.sub('^([0-9]+?\t[0-9]+?\t[0-9]+?\t)([^\n])', r'＊\n\1\2', newData, flags=re.M)

p = re.compile('^([0-9]+?\t[0-9]+?\t[0-9]+?\t)(.+?)\n([0-9]+?\t[0-9]+?\t[0-9]+?\t)$', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\3\n\1\2', newData)
    s = p.search(newData)

newData = re.sub('＊\n', r'', newData, flags=re.M)

# format verse number
newData = re.sub('^([0-9]+?)\t([0-9]+?)\t([0-9]+?)\t', r'<vid id="v\1.\2.\3" onclick="bcv(\1,\2,\3)">\3</vid>', newData, flags=re.M)

# bible verse reference links

newData = re.sub('<a href=\'ref://([0-9]+?)\.([0-9]+?)\.([0-9]+?);\'>(.*?)</a>', r'<ref onclick="bcv(\1,\2,\3)">\4</ref>', newData, flags=re.M)
newData = re.sub('<a href="ref://([0-9]+?)\.([0-9]+?)\.([0-9]+?);">(.*?)</a>', r'<ref onclick="bcv(\1,\2,\3)">\4</ref>', newData, flags=re.M)

newData = re.sub('<a href=\'bible://([^\n<>]*?)\.([0-9]+?)\.([0-9]+?)\'>(.*?)</a>', r'<ref onclick="bcv(『\1』,\2,\3)">\4</ref>', newData, flags=re.M)

newData = re.sub('『Gen』', r'1', newData, flags=re.M)
newData = re.sub('『Exo』', r'2', newData, flags=re.M)
newData = re.sub('『Lev』', r'3', newData, flags=re.M)
newData = re.sub('『Num』', r'4', newData, flags=re.M)
newData = re.sub('『Deu』', r'5', newData, flags=re.M)
newData = re.sub('『Jos』', r'6', newData, flags=re.M)
newData = re.sub('『Jdg』', r'7', newData, flags=re.M)
newData = re.sub('『Rth』', r'8', newData, flags=re.M)
newData = re.sub('『1Sa』', r'9', newData, flags=re.M)
newData = re.sub('『2Sa』', r'10', newData, flags=re.M)
newData = re.sub('『1Ki』', r'11', newData, flags=re.M)
newData = re.sub('『2Ki』', r'12', newData, flags=re.M)
newData = re.sub('『1Ch』', r'13', newData, flags=re.M)
newData = re.sub('『2Ch』', r'14', newData, flags=re.M)
newData = re.sub('『Ezr』', r'15', newData, flags=re.M)
newData = re.sub('『Neh』', r'16', newData, flags=re.M)
newData = re.sub('『Est』', r'17', newData, flags=re.M)
newData = re.sub('『Job』', r'18', newData, flags=re.M)
newData = re.sub('『Psa』', r'19', newData, flags=re.M)
newData = re.sub('『Pro』', r'20', newData, flags=re.M)
newData = re.sub('『Ecc』', r'21', newData, flags=re.M)
newData = re.sub('『Son』', r'22', newData, flags=re.M)
newData = re.sub('『Isa』', r'23', newData, flags=re.M)
newData = re.sub('『Jer』', r'24', newData, flags=re.M)
newData = re.sub('『Lam』', r'25', newData, flags=re.M)
newData = re.sub('『Eze』', r'26', newData, flags=re.M)
newData = re.sub('『Dan』', r'27', newData, flags=re.M)
newData = re.sub('『Hos』', r'28', newData, flags=re.M)
newData = re.sub('『Joe』', r'29', newData, flags=re.M)
newData = re.sub('『Amo』', r'30', newData, flags=re.M)
newData = re.sub('『Oba』', r'31', newData, flags=re.M)
newData = re.sub('『Jon』', r'32', newData, flags=re.M)
newData = re.sub('『Mic』', r'33', newData, flags=re.M)
newData = re.sub('『Nah』', r'34', newData, flags=re.M)
newData = re.sub('『Hab』', r'35', newData, flags=re.M)
newData = re.sub('『Zep』', r'36', newData, flags=re.M)
newData = re.sub('『Hag』', r'37', newData, flags=re.M)
newData = re.sub('『Zec』', r'38', newData, flags=re.M)
newData = re.sub('『Mal』', r'39', newData, flags=re.M)
newData = re.sub('『Mat』', r'40', newData, flags=re.M)
newData = re.sub('『Mar』', r'41', newData, flags=re.M)
newData = re.sub('『Luk』', r'42', newData, flags=re.M)
newData = re.sub('『Joh』', r'43', newData, flags=re.M)
newData = re.sub('『Act』', r'44', newData, flags=re.M)
newData = re.sub('『Rom』', r'45', newData, flags=re.M)
newData = re.sub('『1Co』', r'46', newData, flags=re.M)
newData = re.sub('『2Co』', r'47', newData, flags=re.M)
newData = re.sub('『Gal』', r'48', newData, flags=re.M)
newData = re.sub('『Eph』', r'49', newData, flags=re.M)
newData = re.sub('『Phi』', r'50', newData, flags=re.M)
newData = re.sub('『Php』', r'50', newData, flags=re.M)
newData = re.sub('『Col』', r'51', newData, flags=re.M)
newData = re.sub('『1Th』', r'52', newData, flags=re.M)
newData = re.sub('『2Th』', r'53', newData, flags=re.M)
newData = re.sub('『1Ti』', r'54', newData, flags=re.M)
newData = re.sub('『2Ti』', r'55', newData, flags=re.M)
newData = re.sub('『Tit』', r'56', newData, flags=re.M)
newData = re.sub('『Phm』', r'57', newData, flags=re.M)
newData = re.sub('『Heb』', r'58', newData, flags=re.M)
newData = re.sub('『Jam』', r'59', newData, flags=re.M)
newData = re.sub('『Jas』', r'59', newData, flags=re.M)
newData = re.sub('『1Pe』', r'60', newData, flags=re.M)
newData = re.sub('『2Pe』', r'61', newData, flags=re.M)
newData = re.sub('『1Jo』', r'62', newData, flags=re.M)
newData = re.sub('『2Jo』', r'63', newData, flags=re.M)
newData = re.sub('『3Jo』', r'64', newData, flags=re.M)
newData = re.sub('『1Jn』', r'62', newData, flags=re.M)
newData = re.sub('『2Jn』', r'63', newData, flags=re.M)
newData = re.sub('『3Jn』', r'64', newData, flags=re.M)
newData = re.sub('『Jud』', r'65', newData, flags=re.M)
newData = re.sub('『Rev』', r'66', newData, flags=re.M)

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

newData = re.sub('>[0-9]+?</vid>\n', r'></vid>', newData, flags=re.M)

p = re.compile('(<vid.*?</vid>)(【.*?】|¶|§|†|‡|<br>)', flags=re.M)
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

newData = re.sub(r'<u><b>([0-9]+?):([0-9]+?)-\1:\2</b></u>', r'<u><b>\1:\2</b></u>', newData, flags=re.M)
newData = re.sub(r'<u><b>([0-9]+?):([0-9]+?)-\1:([0-9]+?)</b></u>', r'<u><b>\1:\2-\3</b></u>', newData, flags=re.M)
newData = re.sub('<hr>\n<br><br>', r'<hr>\n', newData, flags=re.M)
newData = re.sub('([^\n])(-\|)', r'\1\n\2', newData, flags=re.M)
newData = re.sub('<hr>(\n\-\|)', r'\1', newData, flags=re.M)
newData = re.sub(r'\\"', r'"', newData, flags=re.M)

p = re.compile('(<u><b>[0-9:\-]+?</b></u>)<br>(<vid[^\n<>]*?></vid>) ', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\2\1', newData)
    s = p.search(newData)

p = re.compile('(<u><b>[0-9:\-]+?</b></u>)(<vid[^\n<>]*?></vid>) ', flags=re.M)
s = p.search(newData)
while s:
    newData = p.sub(r'\2\1', newData)
    s = p.search(newData)

newData = re.sub('(<u><b>[0-9:\-]+?</b></u>)(<vid[^\n<>]*?>)[0-9]+?(</vid>)', r'\2\1\3', newData, flags=re.M)

# close file

f = open(outputFile,'w')
f.write(newData)
f.close()
