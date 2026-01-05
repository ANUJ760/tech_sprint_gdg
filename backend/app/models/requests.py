from pydantic import BaseModel
from typing import List

class RegisterRequest(BaseModel):
    attempts: List[List[float]]  # 10 × 16

class LoginRequest(BaseModel):
    attempt: List[float]         # 16
