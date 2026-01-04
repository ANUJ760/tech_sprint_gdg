from database.db import db
from utils.security import hash_password

def create_user(email, password, avg_vector):
    db.collection("users").document(email).set({
        "password_hash": hash_password(password),
        "avg_keystroke": avg_vector
    })

def get_user(email):
    doc = db.collection("users").document(email).get()
    return doc.to_dict() if doc.exists else None
