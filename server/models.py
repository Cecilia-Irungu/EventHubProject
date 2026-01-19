from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint

# Initialize SQLAlchemy
db = SQLAlchemy()

# USER MODEL


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)

    # Relationships
    events = db.relationship(
        "Event",
        backref="creator",
        cascade="all, delete-orphan"
    )
    feedback = db.relationship(
        "Feedback",
        backref="author",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


# EVENT MODEL


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationship
    feedback = db.relationship(
        "Feedback",
        backref="event",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": str(self.date),
            "location": self.location,
            "user_id": self.user_id
        }


# FEEDBACK MODEL


class Feedback(db.Model):
    __tablename__ = "feedback"
    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5',
                        name='check_rating_range'),
    )

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(
        "events.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "comment": self.comment,
            "user_id": self.user_id,
            "event_id": self.event_id
        }
