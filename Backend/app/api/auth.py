
from fastapi import APIRouter

router = APIRouter(tags=["auth"])


@router.get("/health")
def auth_health() -> dict:
    return {"status": "ok"}

