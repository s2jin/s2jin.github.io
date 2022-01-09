def download_file_from_google_drive(id, destination):
	import requests
	URL = "https://docs.google.com/uc?export=download"

	session = requests.Session()

	print('get_session', flush=True)
	response = session.get(URL, params = { 'id' : id }, stream = True)
	token = get_confirm_token(response)

	print('get_response', flush=True)
	if token:
		params = { 'id' : id, 'confirm' : token }
		response = session.get(URL, params = params, stream = True)

	print('save_content', flush=True)
	save_response_content(response, destination)

def get_confirm_token(response):
	for key, value in response.cookies.items():
		if key.startswith('download_warning'):
			return value

	return None

def save_response_content(response, destination):
	CHUNK_SIZE = 32768

	with open(destination, "wb") as f:
		for chunk in response.iter_content(CHUNK_SIZE):
			if chunk: # filter out keep-alive new chunks
				f.write(chunk)
				
def download(url, destination):
	file_id = url.split('/')[5]
	download_file_from_google_drive(file_id, destination)
