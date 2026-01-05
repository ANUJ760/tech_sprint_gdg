from fastapi import APIRouter, Header, HTTPException
from app.models.requests import RegisterRequest, LoginRequest
from app.services.biometric_service import register_biometrics, verify_biometrics
from app.services.firebase_auth import verify_token

router = APIRouter()

@router.post("/register")
def register(data: RegisterRequest, authorization: str = Header(None)):
    user = verify_token(authorization)
    register_biometrics(user["uid"], data.attempts)
    return {"status": "registered"}

@router.post("/login")
def login(data: LoginRequest, authorization: str = Header(None)):
    user = verify_token(authorization)
    return verify_biometrics(user["uid"], data.attempt)
