from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, Flask
)

from collab.db import get_db

bp = Blueprint('forum', __name__, url_prefix='/forum')


@bp.route('/forumpage', methods=('GET', 'POST'))
def forum():
    # serve forumpage.html
    return render_template("forum/forumpage.html")


@bp.route('/thread', methods=('GET', 'POST'))
def thread():
    # server threads
    return render_template("forum/thread.html")
