import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # VeriFy API credentials
    VERYFI_CLIENT_ID = os.getenv('VERYFI_CLIENT_ID')
    VERYFI_USERNAME = os.getenv('VERYFI_USERNAME')
    VERYFI_API_KEY = os.getenv('VERYFI_API_KEY')

    # Temporary upload folder
    TEMP_UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'temp')

    # Ensure temp folder exists
    os.makedirs(TEMP_UPLOAD_FOLDER, exist_ok=True)