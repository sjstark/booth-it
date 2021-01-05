import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import flask_migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .config import Config

app = Flask(__name__)

# Flask Login Manager Setup
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Integrate flask seeding here eventually


app.config.from_object(Config)


# Init db with app here

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            "FLASK_ENV") == "production" else False,
                        samesite="Strict" if os.environ.get(
                            "FLASK_ENV") == "production" else None,
                        httponly=True
                        )
    return response
