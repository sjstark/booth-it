import functools
from flask_login import current_user

def login_required(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        if current_user.is_anonymous:
            return {"errors": ["Unauthorized"]}, 401
        return func(*args, **kwargs)

    return secure_function
