from collab import app
import socketio
# app = Flask(__name__)


if __name__ == '__main__':
    socketio.run(app)

# app = socketio.WSGIApp()
# socketio.run(app)

