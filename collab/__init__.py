import os

from flask import Flask
from flask_socketio import SocketIO, send

# create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'collab.sqlite'),
)
#
# if test_config is None:
#     # load the instance config, if it exists, when not testing
#     app.config.from_pyfile('config.py', silent=True)
# else:
#     # load the test config if passed in
#     app.config.from_mapping(test_config)

# ensure the instance folder exists
try:

    os.makedirs(app.instance_path)
except OSError:
    pass

from . import db

db.init_app(app)

from . import auth

app.register_blueprint(auth.bp)

from . import whiteboard

app.register_blueprint(whiteboard.bp)
app.add_url_rule('/', endpoint='index')

from . import chat

app.register_blueprint(chat.bp)
socketio = SocketIO(app, cors_allowed_origins="*")
socketio.run(app)

from . import forum

app.register_blueprint(forum.bp)


# on the event message the code executes
@socketio.on('message')
def handle_message(message):
    print("Received message: " + message)
    # if the message is not the default connected message we send the msg
    if message != "User connected!":
        send(message, broadcast=True)
        # broadcast sends message to everyone

#
# def create_app():
#     # create and configure the app
#     app = Flask(__name__, instance_relative_config=True)
#     app.config.from_mapping(
#         SECRET_KEY='dev',
#         DATABASE=os.path.join(app.instance_path, 'collab.sqlite'),
#     )
#
#     # if test_config is None:
#     #     # load the instance config, if it exists, when not testing
#     #     app.config.from_pyfile('config.py', silent=True)
#     # else:
#     #     # load the test config if passed in
#     #     app.config.from_mapping(test_config)
#
#     # ensure the instance folder exists
#     try:
#         os.makedirs(app.instance_path)
#     except OSError:
#         pass
#
#     from . import db
#     db.init_app(app)
#
#     from . import auth
#     app.register_blueprint(auth.bp)
#
#     from . import whiteboard
#     app.register_blueprint(whiteboard.bp)
#     app.add_url_rule('/', endpoint='index')
#
#     return app
