import functools
from flask_login import current_user


def unauthorized():
    return {"errors": ["Unauthorized"]}, 401
