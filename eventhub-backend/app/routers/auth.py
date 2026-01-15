from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.database import get_db
from app.models import User
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token, PasswordResetRequest, PasswordReset
from app.config import settings
from app.utils.email import send_email
import secrets

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, password_hash=hashed_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.post("/password-reset-request")
def request_password_reset(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """
    When a user forgets their password, they can ask for a reset.
    We send them an email with a special token to reset it.
    """
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        # Even if user doesn't exist, we say "email sent" to not reveal info
        return {"message": "If the email exists, a reset link has been sent."}

    # Create a reset token
    reset_token = secrets.token_urlsafe(32)  # This makes a random string
    # In real code, you'd save this token in the database with expiry
    # But for simplicity, we'll just use it directly

    # Send email with reset link
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}&email={user.email}"
    subject = "Reset Your Password"
    body = f"Hello {user.username},\n\nClick this link to reset your password: {reset_link}\n\nIf you didn't request this, ignore this email."
    send_email(user.email, subject, body)

    return {"message": "If the email exists, a reset link has been sent."}

@router.post("/password-reset")
def reset_password(reset: PasswordReset, db: Session = Depends(get_db)):
    """
    This is where the user actually changes their password using the token.
    """
    # In a real app, verify the token from database
    # For now, we'll just check if email exists
    user = db.query(User).filter(User.email == reset.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid reset request")

    # Update the password
    user.password_hash = get_password_hash(reset.new_password)
    db.commit()

    return {"message": "Password reset successfully"}