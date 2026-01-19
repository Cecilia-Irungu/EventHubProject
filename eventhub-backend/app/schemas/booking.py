from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.booking import BookingStatus
from app.schemas.user import UserResponse
from app.schemas.event import EventResponse

class BookingBase(BaseModel):
    number_of_tickets: int = 1

class BookingCreate(BookingBase):
    event_id: int

class BookingUpdate(BaseModel):
    status: Optional[BookingStatus] = None

class BookingResponse(BookingBase):
    id: int
    user: UserResponse
    event: EventResponse
    booking_date: datetime
    status: BookingStatus
    
    class Config:
        from_attributes = True