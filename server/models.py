from config import db
from sqlalchemy.orm import validates
from datetime import date


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)

    events = db.relationship(
        'Event', back_populates='user', cascade='all, delete')
    feedback = db.relationship(
        'Feedback', back_populates='user', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='events')
    feedback = db.relationship(
        'Feedback', back_populates='event', cascade='all, delete')

    @validates('title', 'location')
    def validate_strings(self, key, value):
        if not value or len(value) < 3:
            raise ValueError(f'{key} must be at least 3 characters')
        return value

    @validates('date')
    def validate_date(self, key, value):
        if not isinstance(value, date):
            raise ValueError('Invalid date')
        return value

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat(),
            'location': self.location,
            'user_id': self.user_id
        }


class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(
        'events.id'), nullable=False)

    user = db.relationship('User', back_populates='feedback')
    event = db.relationship('Event', back_populates='feedback')

    @validates('rating')
    def validate_rating(self, key, value):
        if not isinstance(value, int) or not (1 <= value <= 5):
            raise ValueError('Rating must be between 1 and 5')
        return value

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'event_id': self.event_id
        }
