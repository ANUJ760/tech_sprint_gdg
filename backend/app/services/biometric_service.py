from app.services.biometric_model import HybridBiometricProfile
from app.services.firestore_service import save_profile, load_profile

def register_biometrics(user_id: str, attempts: list):
    profile = HybridBiometricProfile()
    profile.train(attempts)

    save_profile(user_id, profile.to_dict())

def verify_biometrics(user_id: str, attempt: list):
    data = load_profile(user_id)
    if not data:
        return {"decision": "REJECT", "reason": "No biometric profile"}

    profile = HybridBiometricProfile()
    profile.from_dict(data)

    return profile.verify(attempt)
