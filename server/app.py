from config import create_app
from models import User, Event, Feedback

app = create_app()


@app.route('/')
def index():
    return {'message': 'Event Hub API running'}


if __name__ == '__main__':
    app.run(port=5555, debug=True)
