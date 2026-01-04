from pydantic import BaseModel
from typing import List

class RegisterRequest(BaseModel):
    attempts: List[List[float]]
    device_type: str

class LoginRequest(BaseModel):
    features: List[float]
    device_type: str
