from app import app
from config import db
from models import User, Event, Feedback
from datetime import date


def seed_data():
    print("🌱 Clearing existing data...")

    # Clear tables
    Feedback.query.delete()
    Event.query.delete()
    User.query.delete()

    # Users
    print("👤 Creating users...")
    user1 = User(username="cecilia", email="cecilia@example.com")
    user2 = User(username="alex", email="alex@example.com")
    user3 = User(username="sam", email="sam@example.com")
    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # Events
    print("📅 Creating events...")
    event1 = Event(
        title="Tech Meetup",
        description="A meetup for developers",
        date=date(2026, 2, 10),
        location="Nairobi",
        user_id=user1.id
    )

    event2 = Event(
        title="Music Festival",
        description="Live performances and networking",
        date=date(2026, 3, 5),
        location="Mombasa",
        user_id=user2.id
    )

    db.session.add_all([event1, event2])
    db.session.commit()

    # Feedback
    print("⭐ Creating feedback...")
    feedback1 = Feedback(
        rating=5,
        comment="Amazing event!",
        user_id=user2.id,
        event_id=event1.id
    )

    feedback2 = Feedback(
        rating=4,
        comment="Great vibes and organization",
        user_id=user3.id,
        event_id=event1.id
    )

    feedback3 = Feedback(
        rating=5,
        comment="Loved every moment",
        user_id=user1.id,
        event_id=event2.id
    )

    db.session.add_all([feedback1, feedback2, feedback3])
    db.session.commit()

    print("✅ Database seeded successfully!")


if __name__ == "__main__":
    with app.app_context():
        seed_data()
