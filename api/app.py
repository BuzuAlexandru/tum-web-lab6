from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint
from db import db
from init_db import init_db


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskmaster.db'
    db.init_app(app)

    SWAGGER_URL = '/api/docs'
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "Taskmaster API"
        },
    )
    app.register_blueprint(swaggerui_blueprint)

    app.config['SECRET_KEY'] = 'alexander123'
    app.config["JWT_SECRET_KEY"] = "password"
    app.config['JWT_TOKEN_LOCATION'] = ['headers']

    jwt = JWTManager(app)
    app = init_db(app)
    migrate = Migrate(app, db)

    return app


if __name__ == '__main__':
    create_app().run(debug=True)