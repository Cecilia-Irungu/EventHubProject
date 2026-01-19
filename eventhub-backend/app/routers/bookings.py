from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Booking, Event
from app.schemas.booking import BookingCreate, BookingResponse, BookingUpdate
from app.routers.auth import get_current_user
from app.models import User

router = APIRouter()

@router.post("/", response_model=BookingResponse)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event = db.query(Event).filter(Event.id == booking.event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.available_seats < booking.number_of_tickets:
        raise HTTPException(status_code=400, detail="Not enough available seats")
    # Check if user already booked
    existing_booking = db.query(Booking).filter(Booking.user_id == current_user.id, Booking.event_id == booking.event_id).first()
    if existing_booking:
        raise HTTPException(status_code=400, detail="Already booked for this event")
    db_booking = Booking(**booking.dict(), user_id=current_user.id)
    event.available_seats -= booking.number_of_tickets
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[BookingResponse])
def read_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    bookings = db.query(Booking).filter(Booking.user_id == current_user.id).offset(skip).limit(limit).all()
    return bookings

@router.get("/{booking_id}", response_model=BookingResponse)
def read_booking(booking_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return booking

@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id: int, booking_update: BookingUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    for key, value in booking_update.dict(exclude_unset=True).items():
        setattr(booking, key, value)
    db.commit()
    db.refresh(booking)
    return booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    event = booking.event
    event.available_seats += booking.number_of_tickets
    db.delete(booking)
    db.commit()
    return {"message": "Booking cancelled"}