from pydantic import BaseModel
from typing import List

class KeystrokeEvent(BaseModel):
    key: str
    press_time: float
    release_time: float

class RegisterRequest(BaseModel):
    email: str
    password: str
    keystrokes: List[List[KeystrokeEvent]]  # 10 samples

class LoginRequest(BaseModel):
    email: str
    password: str
    keystroke: List[KeystrokeEvent]