from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..oauth2 import get_current_user

router = APIRouter()

@router.get("/", response_model=list[schemas.EventOut])
def get_events(db: Session = Depends(get_db)):
    return db.query(models.Event).all()

@router.post("/", response_model=schemas.EventOut)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_event = models.Event(**event.dict(), host_id=current_user.id)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event