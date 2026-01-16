from flask import request, abort
from config import create_app, db
from models import User, Event, Feedback
from datetime import datetime

app = create_app()


@app.route('/')
def index():
    return {'message': 'Event Hub API running'}


# EVENTS ROUTES

# GET /events – get all events
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return [event.to_dict() for event in events], 200


# GET /events/<int:id> – get one event
@app.route('/events/<int:id>', methods=['GET'])
def get_event_by_id(id):
    event = Event.query.get(id)

    if not event:
        abort(404, description="Event not found")

    return event.to_dict(), 200


# POST /events – create an event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()

    try:
        new_event = Event(
            title=data['title'],
            description=data.get('description'),
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            location=data['location'],
            user_id=data['user_id']
        )

        db.session.add(new_event)
        db.session.commit()

        return new_event.to_dict(), 201

    except Exception as e:
        db.session.rollback()
        abort(400, description=str(e))


# PATCH /events/<int:id> – update an event
@app.route('/events/<int:id>', methods=['PATCH'])
def update_event(id):
    event = Event.query.get(id)

    if not event:
        abort(404, description="Event not found")

    data = request.get_json()

    try:
        if 'title' in data:
            event.title = data['title']
        if 'description' in data:
            event.description = data['description']
        if 'date' in data:
            event.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'location' in data:
            event.location = data['location']

        db.session.commit()
        return event.to_dict(), 200

    except Exception as e:
        db.session.rollback()
        abort(400, description=str(e))


# DELETE /events/<int:id>
@app.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)

    if not event:
        abort(404, description="Event not found")

    db.session.delete(event)
    db.session.commit()

    return {}, 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)


# FEEDBACK ROUTES


# GET /feedback – get all feedback
@app.route('/feedback', methods=['GET'])
def get_all_feedback():
    feedback = Feedback.query.all()
    return [f.to_dict() for f in feedback], 200


# GET /events/<int:event_id>/feedback – feedback for one event
@app.route('/events/<int:event_id>/feedback', methods=['GET'])
def get_event_feedback(event_id):
    event = Event.query.get(event_id)

    if not event:
        abort(404, description="Event not found")

    return [f.to_dict() for f in event.feedback], 200


# POST /feedback – create feedback
@app.route('/feedback', methods=['POST'])
def create_feedback():
    data = request.get_json()

    try:
        feedback = Feedback(
            rating=data['rating'],
            comment=data['comment'],
            user_id=data['user_id'],
            event_id=data['event_id']
        )

        db.session.add(feedback)
        db.session.commit()

        return feedback.to_dict(), 201

    except Exception as e:
        db.session.rollback()
        abort(400, description=str(e))


# DELETE /feedback/<int:id>
@app.route('/feedback/<int:id>', methods=['DELETE'])
def delete_feedback(id):
    feedback = Feedback.query.get(id)

    if not feedback:
        abort(404, description="Feedback not found")

    db.session.delete(feedback)
    db.session.commit()

    return {}, 204


# USER ROUTES

# GET /users – get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return [u.to_dict() for u in users], 200


# GET /users/<int:id> – get a single user
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(404, description="User not found")
    return user.to_dict(), 200

# POST /users – create a new user


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        user = User(username=data['username'], email=data['email'])
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201
    except Exception as e:
        db.session.rollback()
        abort(400, description=str(e))
