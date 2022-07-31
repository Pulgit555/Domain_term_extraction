import json
f = open('./hg.json')
data = json.load(f)
data=data['contentsData']
file=open('./HT_urlList.txt','w')
for x in data["items"]:
    print(x["wu"],file=file)
file.close()
f.close()