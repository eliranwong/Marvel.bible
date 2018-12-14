import re

inputFile = 'LXX1_plain.csv'
outputFile = 'LXX1_plain_unaccented.csv'

f = open(inputFile,'r')
newData = f.read()
f.close()

# Greek unicode characters

newData = re.sub('[ἀἄᾄἂἆἁἅᾅἃάᾴὰᾶᾷᾳᾆᾀ]', 'α', newData)
newData = re.sub('[ἈἌἎἉἍἋ]', 'Α', newData)

newData = re.sub('[ἐἔἑἕἓέὲ]', 'ε', newData)
newData = re.sub('[ἘἜἙἝἛ]', 'Ε', newData)

newData = re.sub('[ἠἤᾔἢἦᾖᾐἡἥἣἧᾗᾑήῄὴῆῇῃ]', 'η', newData)
newData = re.sub('[ἨἬἪἮἩἭἫ]', 'Η', newData)

newData = re.sub('[ἰἴἶἱἵἳἷίὶῖϊΐῒ]', 'ι', newData)
newData = re.sub('[ἸἼἹἽ]', 'Ι', newData)

newData = re.sub('[ὀὄὂὁὅὃόὸ]', 'ο', newData)
newData = re.sub('[ὈὌὉὍὋ]', 'Ο', newData)

newData = re.sub('[ῥ]', 'ρ', newData)
newData = re.sub('[Ῥ]', 'Ρ', newData)

newData = re.sub('[ὐὔὒὖὑὕὓὗύὺῦϋΰῢ]', 'υ', newData)
newData = re.sub('[ὙὝὟ]', 'Υ', newData)

newData = re.sub('[ὠὤὢὦᾠὡὥὧᾧώῴὼῶῷῳᾤὣ]', 'ω', newData)
newData = re.sub('[ὨὬὪὮὩὭὯ]', 'Ω', newData)

newData = re.sub("[\-\—\,\;\:\\\?\.\·\·\'\‘\’\᾿\‹\›\“\”\«\»\(\)\[\]\{\}\⧼\⧽\〈\〉\*\‿\᾽\⇔\¦]", "", newData)

f = open(outputFile,'w')
f.write(newData)
f.close()