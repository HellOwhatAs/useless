import os
tmp="""{{
    title: '{}',
    file: '{}',
    howl: null
}},"""
for ii,i in enumerate(os.listdir("./")):
	if  i.endswith(".js") or  i.endswith(".css") or i.endswith(".html") or i.endswith(".py"):
		continue
	nm=str(ii)+i[i.rfind('.'):]
	os.rename(i,nm)
	print(tmp.format(i[:i.rfind('.')],nm),end='')