import os, sys
import pandas as pd
import json

class Viewer():
	def __init__(self):
		self.sep = '——'
		self.result = list()
		self.color_list = ['\33[41m','\33[42m','\33[44m','\33[43m','\33[45m','\33[46m','\33[100m']
		self.color_list = ['\33[101m','\33[102m','\33[104m','\33[103m','\33[105m','\33[106m','\33[107m','\33[100m']

	def color_text(self, text, index=0):
		index = index%len(self.color_list)
		text = '{}{}\33[0m'.format(self.color_list[index],text)
		return text

	def view(self, data, index=0, name=''):
		if type(data) == dict:
			text = '{}{} {} (dict)'.format(self.sep*index, self.color_text(' ',index), name)
			self.result.append(text); print(text)
			for key in sorted(data.keys()):
				self.view(data[key], index+1, name=key)
		elif type(data) == list:
			text = '{}{} {} (list): ({})'.format(self.sep*index, self.color_text(' ',index),name,len(data))
			self.result.append(text); print(text)
			if type(data[0]) in [dict,list]:
				self.view(data[0], index+1)
			else:
				text = '{}{} {} ({}): {}'.format(self.sep*index, self.color_text(' ',index),name,type(data[0]).__name__,data[0])
				self.result.append(text); print(text)
		else:
			text = '{}{} {} ({}): {}'.format(self.sep*index, self.color_text(' ',index),name,type(data).__name__,data)
			self.result.append(text); print(text)

	def load_file(self, filename):
		extension = os.path.splitext(filename)[-1]
		if extension in ['.json']:
			with open(filename, 'r') as f:
				data = json.load(f)
		elif extension in ['jsonl']:
			with open(filename, 'r') as f:
				data = [json.loads(d) for d in f]
		elif extension in ['.txt','.tsv']:
			data = pd.read_csv(filename,sep='\t')
			data = json.loads(data.to_json(orient='records',force_ascii=False))
		else:
			raise NotImplementedError
		return data
  
  def run(self, filename):
    self.view(self.load_file(filename))
