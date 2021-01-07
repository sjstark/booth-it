from werkzeug.security import generate_password_hash
from server.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(email='demo@user.io',
                password='password',
                last_name='User',
                first_name='Demo',
                company='Example Corporation',
                job_title='Product Showman'
                )

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY;')
    db.session.commit()
