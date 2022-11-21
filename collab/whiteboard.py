from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from collab.auth import login_required
from collab.db import get_db

bp = Blueprint('whiteboard', __name__)


@bp.route('/')
def index():
    # db = get_db()
    return render_template('whiteboard/index.html')
