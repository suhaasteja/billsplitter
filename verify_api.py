import requests
import os
import json
import mimetypes

def process_image_with_veryfi_api(image_path):
    url = "https://api.veryfi.com/api/v8/partner/documents/"

    # Retrieve credentials from environment variables
    CLIENT_ID = os.environ.get('VERYFI_CLIENT_ID')
    USERNAME = os.environ.get('VERYFI_USERNAME')
    API_KEY = os.environ.get('VERYFI_API_KEY')

    # Ensure that credentials are set
    if not all([CLIENT_ID, USERNAME, API_KEY]):
        print("Error: API credentials are not fully set.")
        return

    headers = {
        'Accept': 'application/json',
        'CLIENT-ID': CLIENT_ID,
        'AUTHORIZATION': f"apikey {USERNAME}:{API_KEY}"
    }

    # Determine the MIME type of the file
    mime_type, _ = mimetypes.guess_type(image_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'  # Default MIME type

    # Prepare the files parameter with filename and MIME type
    with open(image_path, 'rb') as image_file:
        files = {
            'file': (os.path.basename(image_path), image_file, mime_type)
        }

        try:
            response = requests.post(url, headers=headers, files=files)
            response.raise_for_status()
            data = response.json()
            print(json.dumps(data, indent=2))
            return data
        except requests.exceptions.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
            print(f"Response content: {response.text}")
        except Exception as err:
            print(f"An error occurred: {err}")