from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime, Text
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

event_tags = Table(
    'event_tags',
    Base.metadata,
    Column('event_id', ForeignKey('events.id'), primary_key=True),
    Column('tag_id', ForeignKey('tags.id'), primary_key=True)
)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    events = relationship('Event', back_populates='creator')
    feedbacks = relationship('Feedback', back_populates='user')


class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(DateTime)
    location = Column(String)
    created_by = Column(Integer, ForeignKey('users.id'))
    creator = relationship('User', back_populates='events')
    feedbacks = relationship('Feedback', back_populates='event')
    tags = relationship('Tag', secondary=event_tags, back_populates='events')


class Feedback(Base):
    __tablename__ = 'feedbacks'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    rating = Column(Integer)
    event_id = Column(Integer, ForeignKey('events.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    event = relationship('Event', back_populates='feedbacks')
    user = relationship('User', back_populates='feedbacks')


class Tag(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    events = relationship('Event', secondary=event_tags, back_populates='tags')
