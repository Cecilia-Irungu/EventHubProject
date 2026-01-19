# This is the main file for our EventHub API
# It's like the front door of our application!
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routers import auth, events, bookings, users, categories
from app.config import settings

# Create all the tables in our database
# This is like setting up the shelves before putting things on them
Base.metadata.create_all(bind=engine)

# Create our FastAPI app
# This is the main object that handles all our web requests
app = FastAPI(
    title="EventHive API",
    description="Event Organizing & Booking Platform",
    version="1.0.0"
)

# Add CORS middleware so our frontend can talk to our backend
# CORS is like a security guard that decides who can visit
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # This is where our React app lives
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include all our routers
# Routers are like different departments in a store
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])  # For login/signup
app.include_router(events.router, prefix="/events", tags=["Events"])  # For managing events
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])  # For booking tickets
app.include_router(users.router, prefix="/users", tags=["Users"])  # For user profiles
app.include_router(categories.router, prefix="/categories", tags=["Categories"])  # For event categories

# This is our homepage
@app.get("/")
def read_root():
    return {"message": "Welcome to EventHive API"}