from fastapi import APIRouter, Header, HTTPException
from app.core.firebase_auth import verify_token
from app.services.biometric_service import register_biometrics, verify_biometrics


router = APIRouter(prefix="/api")

@router.post("/register")
def register(data: dict, authorization: str | None = Header(default=None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = authorization.replace("Bearer ", "")
    user_id = verify_token(token)

    attempts = data.get("attempts")
    if not attempts:
        raise HTTPException(status_code=400, detail="Missing attempts")

    register_biometrics(user_id, attempts)
    return {"status": "PROFILE_CREATED"}


@router.post("/login")
def login(data: dict, authorization: str | None = Header(default=None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = authorization.replace("Bearer ", "")
    user_id = verify_token(token)

    attempt = data.get("attempt")
    if not attempt:
        raise HTTPException(status_code=400, detail="Missing attempt")

    return verify_biometrics(user_id, attempt)

