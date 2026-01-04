
import os
import logging
from pathlib import Path

import firebase_admin
from dotenv import load_dotenv
from fastapi import FastAPI
from firebase_admin import credentials

from app.api.auth import router as auth_router
from app.api.keystroke import router as keystroke_router

BACKEND_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(BACKEND_ROOT / ".env")

logger = logging.getLogger(__name__)


def _init_firebase() -> None:
    if firebase_admin._apps:
        return

    cred_path = os.getenv("FIREBASE_CRED_PATH")
    bucket = os.getenv("FIREBASE_BUCKET")

    if not cred_path:
        raise RuntimeError("FIREBASE_CRED_PATH is not set")
    if not bucket:
        raise RuntimeError("FIREBASE_BUCKET is not set")

    cred_file = Path(cred_path)
    if not cred_file.is_absolute():
        cred_file = BACKEND_ROOT / cred_file

    if not cred_file.exists():
        raise FileNotFoundError(f"Firebase service account key not found at: {cred_file}")

    cred = credentials.Certificate(str(cred_file))
    firebase_admin.initialize_app(cred, {"storageBucket": bucket})


app = FastAPI(title="Keystroke Biometric Backend")

app.include_router(auth_router, prefix="/auth")
app.include_router(keystroke_router, prefix="/keystroke")


@app.on_event("startup")
def _startup() -> None:
    try:
        _init_firebase()
    except Exception as exc:
        logger.exception("Firebase initialization failed: %s", exc)


@app.get("/")
def root() -> dict:
    return {"status": "Backend running"}
