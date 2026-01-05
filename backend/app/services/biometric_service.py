from app.services.model_store import save_profile, get_profile


def register_biometrics(user_id, attempts):
    if len(attempts) != 10:
        raise ValueError("Exactly 10 attempts required")
    save_profile(user_id, attempts)

def verify_biometrics(user_id, attempt):
    profile = get_profile(user_id)
    if not profile:
        raise ValueError("Biometric profile not found")
    return profile.verify(attempt)
