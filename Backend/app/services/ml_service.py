import requests
from config import ML_SERVICE_URL

def call_ml_service(avg_vector, current_vector):
    """
    ML CONTRACT (future):

    Input:
    {
        "avg_vector": [...],
        "current_vector": [...]
    }

    Output:
    {
        "similarity_score": float,
        "decision": "ALLOW" | "DENY"
    }
    """
    payload = {
        "avg_vector": avg_vector,
        "current_vector": current_vector
    }

    response = requests.post(ML_SERVICE_URL, json=payload, timeout=5)
    return response.json()
