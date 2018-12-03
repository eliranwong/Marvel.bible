#!/usr/bin/env python
# -*- coding: utf-8 -*-
# a script adapted from https://gist.github.com/zed/1304181
# task: import multiple images into a sqlite file
import glob
import os
import sqlite3

# support both Python 2.x and 3.x
try: buffer = buffer
except NameError:
    buffer = lambda x: x # on Python 3.x 'rb' mode already returns what we need

def U(literal_string):
    if hasattr(literal_string, 'decode'):
        return literal_string.decode('utf-8') # source code encoding
    return literal_string

# open db
conn = sqlite3.connect('dictionary.sqlite') # specify a database filename here
conn.execute('''create table if not exists Dictionary (
                    path unique not null, 
                    content text
                )''') # specify a table name here

def genimages():
    """Generate example Dictionary.""" # specify a table name here
    for imagepath in glob.iglob(os.path.expanduser(U('dic_*.html'))): # specify a path here; unix command for add prefix for multiple files: for f in * ; do mv -- "$f" "dic_$f" ; done
        with open(imagepath, 'rb') as f:
            yield imagepath, buffer(f.read())

# insert images
with conn: # insert all or nothing
    conn.executemany('insert into Dictionary(path,content) values(?, ?)', genimages()) # specify a table name here

# print image paths
#for path, in conn.execute('select path from Dictionary'): # specify a table name here
#    print(path)

