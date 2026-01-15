from app.database import SessionLocal, engine
from app.models import Base, User, Category, Event, Booking
from app.auth.security import get_password_hash
from datetime import datetime, timedelta

def seed_database():
    """
    This function puts some starting data into our database.
    It's like filling the fridge before a party!
    """
    # Create a database session
    db = SessionLocal()

    try:
        # First, let's create some users
        users_data = [
            {"username": "admin", "email": "admin@eventhub.com", "password": "admin123", "role": "admin"},
            {"username": "organizer1", "email": "org1@eventhub.com", "password": "org123", "role": "organizer"},
            {"username": "user1", "email": "user1@eventhub.com", "password": "user123", "role": "user"},
            {"username": "user2", "email": "user2@eventhub.com", "password": "user123", "role": "user"},
        ]

        users = []
        for user_data in users_data:
            # Check if user already exists
            existing = db.query(User).filter(User.username == user_data["username"]).first()
            if not existing:
                user = User(
                    username=user_data["username"],
                    email=user_data["email"],
                    password_hash=get_password_hash(user_data["password"]),
                    role=user_data["role"]
                )
                db.add(user)
                users.append(user)
            else:
                users.append(existing)

        # Now, create some categories
        categories_data = [
            {"name": "Music", "description": "Concerts and music events"},
            {"name": "Sports", "description": "Sports games and activities"},
            {"name": "Technology", "description": "Tech conferences and workshops"},
            {"name": "Art", "description": "Art exhibitions and shows"},
        ]

        categories = []
        for cat_data in categories_data:
            existing = db.query(Category).filter(Category.name == cat_data["name"]).first()
            if not existing:
                category = Category(name=cat_data["name"], description=cat_data["description"])
                db.add(category)
                categories.append(category)
            else:
                categories.append(existing)

        # Create some events
        events_data = [
            {
                "title": "Summer Music Festival",
                "description": "A great outdoor music event",
                "date": datetime.now() + timedelta(days=30),
                "location": "Central Park",
                "price": 50.0,
                "capacity": 1000,
                "available_seats": 1000,
                "organizer": users[1],  # organizer1
                "categories": [categories[0]]  # Music
            },
            {
                "title": "Tech Conference 2024",
                "description": "Latest in technology",
                "date": datetime.now() + timedelta(days=60),
                "location": "Convention Center",
                "price": 100.0,
                "capacity": 500,
                "available_seats": 500,
                "organizer": users[1],
                "categories": [categories[2]]  # Technology
            },
            {
                "title": "Football Match",
                "description": "Local teams playing",
                "date": datetime.now() + timedelta(days=15),
                "location": "Stadium",
                "price": 25.0,
                "capacity": 20000,
                "available_seats": 20000,
                "organizer": users[1],
                "categories": [categories[1]]  # Sports
            }
        ]

        events = []
        for event_data in events_data:
            existing = db.query(Event).filter(Event.title == event_data["title"]).first()
            if not existing:
                event = Event(
                    title=event_data["title"],
                    description=event_data["description"],
                    date=event_data["date"],
                    location=event_data["location"],
                    price=event_data["price"],
                    capacity=event_data["capacity"],
                    available_seats=event_data["available_seats"],
                    organizer_id=event_data["organizer"].id
                )
                event.categories = event_data["categories"]
                db.add(event)
                events.append(event)
            else:
                events.append(existing)

        # Create some bookings
        bookings_data = [
            {"user": users[2], "event": events[0], "number_of_tickets": 2},  # user1 books 2 tickets for music festival
            {"user": users[3], "event": events[1], "number_of_tickets": 1},  # user2 books 1 ticket for tech conf
        ]

        for booking_data in bookings_data:
            existing = db.query(Booking).filter(
                Booking.user_id == booking_data["user"].id,
                Booking.event_id == booking_data["event"].id
            ).first()
            if not existing:
                booking = Booking(
                    user_id=booking_data["user"].id,
                    event_id=booking_data["event"].id,
                    number_of_tickets=booking_data["number_of_tickets"]
                )
                # Update available seats
                booking_data["event"].available_seats -= booking_data["number_of_tickets"]
                db.add(booking)

        # Save all changes
        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Create tables first
    Base.metadata.create_all(bind=engine)
    seed_database()