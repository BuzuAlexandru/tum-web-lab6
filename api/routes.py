from datetime import timedelta

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_jwt_extended import get_jwt
from models import TaskCard, Task
from __main__ import app
from db import db


def role_required(role):
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()
            print(role in claims['role'])
            if 'role' not in claims or role not in claims['role']:
                return jsonify({"msg": "Forbidden"}), 403
            return fn(*args, **kwargs)
        decorator.__name__ = fn.__name__
        return decorator

    return wrapper


@app.route('/token', methods=['GET'])
def get_token():
    try:
        if request.method == 'GET':
            role = request.args.get("role", type=str)
            claims = ['user']
            if role == 'admin':
                claims.append(role)
            token = create_access_token(
                identity="user",
                expires_delta=timedelta(minutes=30),
                additional_claims={'role': claims},
            )
            return jsonify({"token": token}), 200
    except KeyError:
        jsonify({"error": "Bad request"}), 400


@app.route('/taskcards', methods=['POST'])
@role_required('user')
def add_task_card():
    data = request.get_json()
    title = data.get('title')
    favourite = data.get('favourite', False)
    new_task_card = TaskCard(title=title, favourite=favourite)
    db.session.add(new_task_card)
    db.session.commit()
    return jsonify({"message": "Task card added", "task_card": {"id": new_task_card.id, "title": new_task_card.title, "favourite": new_task_card.favourite}}), 201


@app.route('/taskcards/<int:card_id>/tasks', methods=['POST'])
@role_required('user')
def add_task(card_id):
    data = request.get_json()
    description = data.get('description')
    completed = data.get('completed', False)
    new_task = Task(card_id=card_id, description=description, completed=completed)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added", "task": {"id": new_task.id, "card_id": new_task.card_id, "description": new_task.description, "completed": new_task.completed}}), 201


@app.route('/taskcards', methods=['GET'])
@role_required('user')
def get_task_cards():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    taskcards_paginated = TaskCard.query.paginate(page=page, per_page=per_page)
    if taskcards_paginated is not None:
        taskcards = []
        for taskcard in taskcards_paginated.items:
            tasks = [{"id": task.id, "description": task.description, "completed": task.completed} for task in taskcard.tasks]
            taskcards.append({"id": taskcard.id, "title": taskcard.title, "favourite": taskcard.favourite, "tasks": tasks})
        return jsonify({
            "taskcards": taskcards,
            "total": taskcards_paginated.total,
            "pages": taskcards_paginated.pages,
            "current_page": taskcards_paginated.page
        }), 200
    else:
        return jsonify({"error": "No data found"}), 404


@app.route('/taskcards/<int:card_id>', methods=['PUT'])
@role_required('user')
def update_task_card(card_id):
    data = request.get_json()
    task_card = TaskCard.query.get_or_404(card_id)
    task_card.title = data.get('title', task_card.title)
    task_card.favourite = data.get('favourite', task_card.favourite)
    db.session.commit()
    return jsonify({"message": "Task card updated", "task_card": {"id": task_card.id, "title": task_card.title, "favourite": task_card.favourite}}), 200


@app.route('/tasks/<int:task_id>', methods=['PUT'])
@role_required('user')
def update_task(task_id):
    data = request.get_json()
    task = Task.query.get_or_404(task_id)
    task.description = data.get('description', task.description)
    task.completed = data.get('completed', task.completed)
    db.session.commit()
    return jsonify({"message": "Task updated", "task": {"id": task.id, "card_id": task.card_id, "description": task.description, "completed": task.completed}}), 200


@app.route('/taskcards/<int:card_id>', methods=['DELETE'])
@role_required('admin')
def delete_task_card(card_id):
    task_card = TaskCard.query.get_or_404(card_id)
    db.session.delete(task_card)
    db.session.commit()
    return jsonify({"message": "Task card deleted"}), 200


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
@role_required('admin')
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200
