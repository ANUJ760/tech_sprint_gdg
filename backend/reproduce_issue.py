
import numpy as np
from app.services.model_store import save_profile, get_profile
from app.services.biometric_service import verify_biometrics

# Mock data creation
def create_random_embedding(dim=20):
    return np.random.rand(dim).tolist()

def run():
    user_id = "user_tight"
    
    # Create 10 samples for training - VERY TIGHT (low variance)
    # Simulates a user just hitting "capture" 10 times in 1 second without moving
    base_embedding = np.random.rand(20)
    samples = []
    for _ in range(10):
        noise = np.random.normal(0, 0.0001, 20) # Almost zero noise
        samples.append((base_embedding + noise).tolist())
    
    # Save profile
    print("Registering biometrics (tight)...")
    try:
        from app.services.biometric_model import HybridBiometricProfile
        profile = HybridBiometricProfile()
        profile.train(samples)
        from app.services.model_store import _profiles
        _profiles[user_id] = profile
        
        # Debug internal state
        print(f"Debug - Coarse Alpha: {profile.coarse.alpha}")
        print(f"Debug - Coarse Var mean: {np.mean(profile.coarse.var)}")
        
        print("Profile registered.")
    except Exception as e:
        print(f"Registration failed: {e}")
        return

    # Create a verification attempt - NORMAL usage variation
    # Real world variation is usually higher than 'burst mode' registration
    attempt_noise = np.random.normal(0, 0.01, 20) # 0.01 is still small but 100x the training noise
    attempt = (base_embedding + attempt_noise).tolist()
    
    print("\nVerifying attempt...")
    try:
        result = verify_biometrics(user_id, attempt)
        print("Verification Result:", result)
        
        # Check internal model details
        profile = get_profile(user_id)
        if profile:
             coarse_x = np.array([
                np.mean(attempt[:6]),
                np.mean(attempt[6:11]),
                np.mean(attempt[11:])
            ])
             raw_score = profile.coarse.score(coarse_x)
             print(f"Debug - Coarse Score raw: {raw_score}")
             
    except Exception as e:
        print(f"Verification error: {e}")

if __name__ == "__main__":
    run()
