from app.services.biometric_model import HybridBiometricProfile


_profiles = {}

def save_profile(user_id, samples):
    profile = HybridBiometricProfile()
    profile.train(samples)
    _profiles[user_id] = profile

def get_profile(user_id):
    return _profiles.get(user_id)
