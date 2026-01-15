from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

# Association table for many-to-many relationship
event_categories = Table(
    'event_categories',
    Base.metadata,
    Column('event_id', Integer, ForeignKey('events.id')),
    Column('category_id', Integer, ForeignKey('categories.id'))
)

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text)
    date = Column(DateTime, nullable=False)
    location = Column(String, nullable=False)
    price = Column(Float, default=0.0)
    capacity = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Foreign Keys
    organizer_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationships
    organizer = relationship("User", back_populates="events_organized")
    bookings = relationship("Booking", back_populates="event")
    categories = relationship("Category", secondary=event_categories, back_populates="events")