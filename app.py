from collab import app
import socketio
# app = Flask(__name__)


if __name__ == '__main__':
    sio = socketio.AsyncServer(async_mode='asgi')
    app = socketio.ASGIApp(sio)

# app = socketio.WSGIApp()
# socketio.run(app)

