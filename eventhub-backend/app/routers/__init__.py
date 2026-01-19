from app.routers.auth import router as auth_router
from app.routers.events import router as events_router
from app.routers.bookings import router as bookings_router
from app.routers.users import router as users_router

__all__ = ["auth_router", "events_router", "bookings_router", "users_router"]