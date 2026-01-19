from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..oauth2 import get_current_user

router = APIRouter()

@router.get("/me", response_model=schemas.UserOut)
def get_profile(current_user = Depends(get_current_user)):
    return current_user