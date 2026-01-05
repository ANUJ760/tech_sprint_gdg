
from firebase_admin import firestore
from app.services.firebase_service import initialize_firebase

# Ensure Firebase is initialized before getting client
initialize_firebase()
db = firestore.client()

def save_profile(user_id: str, profile_data: dict):
    """Saves the serialized biometric profile to Firestore."""
    db.collection("biometric_profiles").document(user_id).set(profile_data)

def load_profile(user_id: str):
    """Loads a serialized biometric profile from Firestore."""
    doc = db.collection("biometric_profiles").document(user_id).get()
    if not doc.exists:
        return None
    return doc.to_dict()
