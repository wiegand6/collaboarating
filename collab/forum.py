from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, Flask
)

from collab.db import get_db

bp = Blueprint('forum', __name__, url_prefix='/forum')


@bp.route('/forumpage', methods=('GET', 'POST'))
def forum():
    if request.method == 'POST':
        post_username = request.form['post_username']
        post_title = request.form['post_title']
        post_text = request.form['post_text']
        db = get_db()
        error = None

        if error is None:
            try:
                db.execute(
                    "INSERT INTO forumPost (post_username, post_title, post_text) VALUES (?, ?, ?)",
                    (post_username, post_title, post_text),
                )
                db.commit()
            except db.IntegrityError:
                error = f"Post already exists."

    if request.method == 'GET':
        db = get_db()
        db.execute('SELECT * FROM forumPost')


    # serve forumpage.html
    return render_template("forum/forumpage.html")


@bp.route('/thread', methods=('GET', 'POST'))
def thread():
    db = get_db()
    if request.method =='POST':
        title = request.form['title']
        username = request.form['username']
        comment = request.form['comment']
        error = None

        if error is None:
            try:
                db.execute(
                    "INSERT INTO forumComment (title, username, comment) VALUES (?, ?, ?)",
                    (title, username, comment),
                )
                db.commit()
            except db.IntegrityError:
                error = f"comment already exists."

    # serve server thread template
    return render_template("forum/thread.html")


@bp.route('/forumposts', methods=('GET', 'POST'))
def forumposts():
    db = get_db()
    results = db.execute('SELECT * FROM forumPost')
    return render_template("forum/forumposts.html", results=results)

