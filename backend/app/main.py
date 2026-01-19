from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database, auth
from datetime import datetime

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------- USER -----------------


@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username,
                          email=user.email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users/me", response_model=schemas.User)
def get_me(user_id: int = Depends(auth.verify_token), db: Session = Depends(get_db)):
    user = db.query(models.User).get(user_id)
    return user


# ----------------- LOGIN -----------------


@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
    access_token = auth.create_access_token({"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

# ----------------- EVENTS -----------------


@app.get("/events", response_model=list[schemas.Event])
def get_events(db: Session = Depends(get_db)):
    return db.query(models.Event).all()


@app.post("/events", response_model=schemas.Event)
def create_event(event: schemas.EventBase, user_id: int = Depends(auth.verify_token), db: Session = Depends(get_db)):
    db_event = models.Event(**event.dict(), created_by=user_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


@app.put("/events/{event_id}", response_model=schemas.Event)
def update_event(event_id: int, event: schemas.EventBase, user_id: int = Depends(auth.verify_token), db: Session = Depends(get_db)):
    db_event = db.query(models.Event).get(event_id)
    if not db_event:
        raise HTTPException(404, "Event not found")
    for key, value in event.dict().items():
        setattr(db_event, key, value)
    db.commit()
    return db_event


@app.delete("/events/{event_id}")
def delete_event(event_id: int, user_id: int = Depends(auth.verify_token), db: Session = Depends(get_db)):
    db_event = db.query(models.Event).get(event_id)
    if not db_event:
        raise HTTPException(404, "Event not found")
    db.delete(db_event)
    db.commit()
    return {"message": "Deleted"}

# ----------------- FEEDBACK -----------------


@app.post("/feedback", response_model=schemas.Feedback)
def create_feedback(feedback: schemas.FeedbackBase, event_id: int, user_id: int = Depends(auth.verify_token), db: Session = Depends(get_db)):
    db_feedback = models.Feedback(
        **feedback.dict(), event_id=event_id, user_id=user_id)
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


@app.get("/feedback/{event_id}", response_model=list[schemas.Feedback])
def get_feedback(event_id: int, db: Session = Depends(get_db)):
    return db.query(models.Feedback).filter(models.Feedback.event_id == event_id).all()
