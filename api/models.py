from db import db


class TaskCard(db.Model):
    __tablename__ = 'taskcards'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    favourite = db.Column(db.Boolean, default=False)
    tasks = db.relationship(
        'Task',
        backref='taskcard',
        cascade="all, delete"
    )


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('taskcards.id'), nullable=False)
    description = db.Column(db.String)
    completed = db.Column(db.Boolean, default=False)
