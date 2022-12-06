DROP TABLE IF EXISTS user;


CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE forumPost (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_username TEXT NOT NULL,
    post_title TEXT  NULL,
    post_text TEXT NULL,
    post_time TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forumComments (
    post_id INTEGER PRIMARY KEY,
    comment_id INTEGER AUTOINCREMENT,
    comment_username TEXT NOT NULL,
    comment_time TEXT DEFAULT CURRENT_TIMESTAMP,
    comment_text VARCHAR MAX NULL
)