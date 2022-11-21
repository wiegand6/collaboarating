from app import app


# a simple page that says hello
# Development page



@app.route('/')
def hello():
    return 'Hello, World!!!!!!'