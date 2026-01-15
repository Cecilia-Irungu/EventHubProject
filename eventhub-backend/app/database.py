# This file handles our database connections
# Databases are like big filing cabinets for our data
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from app.config import settings

# Get the database URL from settings
SQLALCHEMY_DATABASE_URL = settings.database_url

# Create the database engine
# The engine is like the key to open the database
if SQLALCHEMY_DATABASE_URL.startswith("postgresql"):
    # For PostgreSQL databases
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    # For SQLite databases (which we're using)
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

# Create a session maker
# Sessions are like conversations with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the base class for our models
# All our database tables will inherit from this
Base = declarative_base()

def get_db():
    """
    This function gives us a database session.
    We use it in our routes to talk to the database.
    """
    db = SessionLocal()
    try:
        # This 'yield' makes it a generator function
        # FastAPI uses this to handle the database connection
        yield db
    finally:
        # Always close the connection when done
        db.close()