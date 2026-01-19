from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime


class TagBase(BaseModel):
    name: str


class Tag(TagBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class EventBase(BaseModel):
    title: str
    description: str
    date: datetime
    location: str


class Event(EventBase):
    id: int
    tags: List[Tag] = []

    class Config:
        orm_mode = True


class FeedbackBase(BaseModel):
    content: str
    rating: int


class Feedback(FeedbackBase):
    id: int
    user: User

    class Config:
        orm_mode = True
