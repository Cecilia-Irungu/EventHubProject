from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import enum
from datetime import datetime

class UserRole(str, enum.Enum):
    USER = "user"
    ORGANIZER = "organizer"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.USER)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    events_organized = relationship("Event", back_populates="organizer")
    bookings = relationship("Booking", back_populates="user")