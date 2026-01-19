from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

class EventBase(BaseModel):
    title: str
    description: str
    date: datetime
    location: str
    price: float = 0.0
    capacity: int = 100
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    id: int
    host_id: int
    created_at: datetime

    class Config:
        from_attributes = True
class BookingBase(BaseModel):
    ticket_type: str
    price_paid: float

class BookingCreate(BookingBase):
    event_id: int

class BookingOut(BookingBase):
    id: int
    user_id: int
    event_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True