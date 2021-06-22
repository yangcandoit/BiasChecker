import json

with open("../read_json.json", 'r') as f:
    temp = json.loads(f.read())
    print(temp)
    print(temp['rule'])
    print(temp['rule']['namespace'])
