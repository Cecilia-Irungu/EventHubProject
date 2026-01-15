from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
import enum

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(BookingStatus), default=BookingStatus.CONFIRMED)
    number_of_tickets = Column(Integer, default=1)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    
    # Relationships
    user = relationship("User", back_populates="bookings")
    event = relationship("Event", back_populates="bookings")