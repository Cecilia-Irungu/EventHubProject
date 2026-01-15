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
