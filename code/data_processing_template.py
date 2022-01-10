import os
import json

def get_filelist(dirname):
	return sum([[os.path.join(d[0],f) for f in d[-1]] for d in list(os.walk(dirname))],[])

def read_file(filename):
	ext = os.path.splitext(filename)[-1]
	if ext == '.json':
		with open(filename,'r') as f: return json.load(f)
	elif ext == '.jsonl':
		with open(filename,'r') as f: return [json.loads(d) for d in f]
	elif ext == '.tsv':
		with open(filename,'r') as f: return [d.strip().split('\t') for d in f]
	else:
		with open(filename,'r') as f: return f.read()

def write_file(data, filename):
	ext = os.path.splitext(filename)[-1]
	if ext == '.json':
		with open(filename,'w') as f:
			json.dump(data, f, ensure_ascii=False, indent=2)
	elif ext == '.jsonl':
		with open(filename,'w') as f:
			for item in data:
				f.write('{}\n'.format(json.dumps(item, ensure_ascii=False)))
	elif ext == '.tsv':
		with open(filename,'w') as f:
				f.write('{}\n'.format('\n'.join(['\t'.join(d) for d in data])))
	else:
		with open(filename,'w') as f:
			f.write('{}\n'.format(data))

if __name__=='__main__':

	dirname = ''
	filelist = get_filelist(dirname)
	for filename in filelist:
		data = read_file(filename)
