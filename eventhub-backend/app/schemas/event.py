from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.schemas.user import UserResponse
from app.schemas.category import CategoryResponse

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    location: str
    price: float = 0.0
    capacity: int
    available_seats: int

class EventCreate(EventBase):
    category_ids: Optional[List[int]] = []

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    price: Optional[float] = None
    capacity: Optional[int] = None
    available_seats: Optional[int] = None
    category_ids: Optional[List[int]] = None

class EventResponse(EventBase):
    id: int
    organizer: UserResponse
    created_at: datetime
    categories: List[CategoryResponse]
    
    class Config:
        from_attributes = True