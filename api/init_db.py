from db import db
from models import TaskCard, Task


def init_db(app):
    with app.app_context():
        db.create_all()
    return app