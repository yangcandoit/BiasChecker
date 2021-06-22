from itertools import groupby

f = open("term.txt")
lines = f.readlines()
for i in range(len(lines)):
    lines[i]=lines[i].replace('"','').replace(',','').strip()
f.close()

a,b,c=[list(g) for k,g in groupby(lines,lambda x:x=='') if not k]

f = open("states.txt",encoding='utf-8')
lines = f.readlines()
for i in range(len(lines)):
    lines[i]=lines[i].replace('"','').replace(',','').strip()
f.close()

d,e=[list(g) for k,g in groupby(lines,lambda x:x=='') if not k]

import json
with open("./reddit/reddit-carry.json",'r+',encoding='utf-8') as load_f:
    load_dict = json.load(load_f)   
    print(load_dict)