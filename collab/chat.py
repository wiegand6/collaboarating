import functools
from flask_socketio import SocketIO, send
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, Flask
)

from collab.db import get_db

bp = Blueprint('chat', __name__, url_prefix='/chat')


@bp.route('/chatwindow', methods=('GET', 'POST'))
def chatwindow():
    # give chatwindow.html
    return render_template("chat/chatwindow.html")


