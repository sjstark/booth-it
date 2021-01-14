import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send

from .models import *

from server.utils.auth import unauthorized

from .seeds import seed_commands

from .config import Config


# Initialize Socket IO without app for import into blueprints
socketio = SocketIO()


def create_app(debug=False):
    from .api.auth_routes import auth_routes
    from .api.show_routes import show_routes
    from .api.invite_routes import invite_routes
    from .api.messenger import messenger_bp

    app = Flask(__name__)

    # Set the app into debug mode to refresh on detected changes
    app.debug = debug

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

    # Socket IO for messages
    app.register_blueprint(messenger_bp)

    # @socketio.on("connection")
    # def joined(message):
    #     print('New client connected')

    # @socketio.on("message")
    # def handle_message(message):
    #     print(message)
    #     send(message, broadcast=True)
    #     return None

    socketio.init_app(app, cors_allowed_origins="*")

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

    return app
