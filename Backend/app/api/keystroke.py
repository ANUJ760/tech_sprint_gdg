
from fastapi import APIRouter

router = APIRouter(tags=["keystroke"])


@router.get("/health")
def keystroke_health() -> dict:
    return {"status": "ok"}

