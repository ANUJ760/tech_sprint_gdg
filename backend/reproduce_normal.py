
import numpy as np
from app.services.model_store import save_profile, get_profile
from app.services.biometric_service import verify_biometrics

# Mock data creation
def create_random_embedding(dim=20):
    return np.random.rand(dim).tolist()

def run():
    user_id = "user_normal"
    
    # Create 10 samples for training - NORMAL (standard variance)
    base_embedding = np.random.rand(20)
    samples = []
    for _ in range(10):
        noise = np.random.normal(0, 0.01, 20) # Normal noise 0.01
        samples.append((base_embedding + noise).tolist())
    
    # Save profile
    print("Registering biometrics (normal)...")
    try:
        from app.services.biometric_model import HybridBiometricProfile
        profile = HybridBiometricProfile()
        profile.train(samples)
        from app.services.model_store import _profiles
        _profiles[user_id] = profile
        print("Profile registered.")
    except Exception as e:
        print(f"Registration failed: {e}")
        return

    # Create a verification attempt - NORMAL usage variation
    attempt_noise = np.random.normal(0, 0.02, 20) 
    attempt = (base_embedding + attempt_noise).tolist()
    
    print("\nVerifying attempt...")
    try:
        result = verify_biometrics(user_id, attempt)
        print("Verification Result:", result)
        
    except Exception as e:
        print(f"Verification error: {e}")

if __name__ == "__main__":
    run()
