from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..oauth2 import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.BookingOut)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Simple check - event exists
    event = db.query(models.Event).filter(models.Event.id == booking.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    new_booking = models.Booking(**booking.dict(), user_id=current_user.id)
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@router.get("/me", response_model=list[schemas.BookingOut])
def get_my_bookings(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()