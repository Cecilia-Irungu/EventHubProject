from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Event, Category
from app.schemas.event import EventCreate, EventResponse, EventUpdate
from app.schemas.category import CategoryResponse
from app.routers.auth import get_current_user
from app.models import User

router = APIRouter()

@router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role not in ["organizer", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to create events")
    categories = db.query(Category).filter(Category.id.in_(event.category_ids)).all()
    if len(categories) != len(event.category_ids):
        raise HTTPException(status_code=400, detail="Some categories not found")
    db_event = Event(**event.dict(exclude={"category_ids"}), organizer_id=current_user.id)
    db_event.categories = categories
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/", response_model=List[EventResponse])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = db.query(Event).offset(skip).limit(limit).all()
    return events

@router.get("/{event_id}", response_model=EventResponse)
def read_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: int, event_update: EventUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.organizer_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    update_data = event_update.dict(exclude_unset=True)
    if "category_ids" in update_data:
        categories = db.query(Category).filter(Category.id.in_(update_data["category_ids"])).all()
        if len(categories) != len(update_data["category_ids"]):
            raise HTTPException(status_code=400, detail="Some categories not found")
        event.categories = categories
        del update_data["category_ids"]
    for key, value in update_data.items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return event

@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.organizer_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    db.delete(event)
    db.commit()
    return {"message": "Event deleted"}