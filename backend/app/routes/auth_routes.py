from fastapi import APIRouter, Header, HTTPException
from models.schemas import RegisterRequest, LoginRequest
from services.firebase_service import verify_token
from services.ml_service import (
    register_user_profile,
    evaluate_login_risk
)

router = APIRouter(prefix="/api")

@router.post("/register")
def register(
    payload: RegisterRequest,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    try:
        user_id = verify_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or missing token")

    if len(payload.attempts) < 5:
        raise HTTPException(status_code=400, detail="Not enough samples")

    register_user_profile(
        user_id,
        payload.attempts,
        payload.device_type
    )

    return {"status": "REGISTERED"}


@router.post("/login")
def login(
    payload: LoginRequest,
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    try:
        user_id = verify_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or missing token")

    risk = evaluate_login_risk(
        user_id,
        payload.features,
        payload.device_type
    )

    if risk == "LOW":
        return {"status": "SUCCESS"}

    if risk == "MEDIUM":
        return {"status": "RETRY"}

    if risk == "HIGH":
        return {"status": "DENIED"}

    raise HTTPException(status_code=500, detail="Invalid risk response")
