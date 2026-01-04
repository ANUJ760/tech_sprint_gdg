import os
from dotenv import load_dotenv

load_dotenv()

# Firebase
FIREBASE_CRED_PATH = os.getenv("FIREBASE_CRED_PATH")
FIREBASE_BUCKET = os.getenv("FIREBASE_BUCKET")

# Keystroke config
KEYSTROKE_SAMPLE_COUNT = 10
BIOMETRIC_THRESHOLD = 0.25  # fallback rule-based threshold

# ML (future use)
USE_ML_SERVICE = False
ML_SERVICE_URL = "http://ml-service:9000/predict"
