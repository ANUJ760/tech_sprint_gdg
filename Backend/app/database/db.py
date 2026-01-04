import firebase_admin
from firebase_admin import credentials, firestore, storage
from config import FIREBASE_CRED_PATH, FIREBASE_BUCKET

cred = credentials.Certificate(FIREBASE_CRED_PATH)

firebase_admin.initialize_app(cred, {
    "storageBucket": FIREBASE_BUCKET
})

db = firestore.client()
bucket = storage.bucket()
