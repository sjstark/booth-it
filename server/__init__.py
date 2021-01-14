import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import *
from .api.auth_routes import auth_routes
from .api.show_routes import show_routes
from .api.invite_routes import invite_routes

from server.utils.auth import unauthorized

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Flask Login Manager Setup
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


@login.unauthorized_handler
def unauth_handler():
    return {'errors': ['Unauthorized']}, 401


# Integrate flask seeding here eventually
app.cli.add_command(seed_commands)

app.config.from_object(Config)

# Init db with app here
db.init_app(app)
Migrate(app, db)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(show_routes, url_prefix='/api/shows')
app.register_blueprint(invite_routes, url_prefix='/api/invites')

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


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


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")
