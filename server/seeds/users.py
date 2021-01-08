from werkzeug.security import generate_password_hash

from server.models import db, User
from server.utils.faker import fake

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

    exampleUsers = []

    for _ in range(25):
        person = fake.profile(["mail", 'name', 'company', 'job'])
        [ first_name, last_name, *_ ] = person['name'].split(" ")
        db.session.add( User(
                email=person['mail'],
                password="password",
                last_name=last_name,
                first_name=first_name,
                company=person['company'],
                job_title=person['job']
            )
        )

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY;')
    db.session.commit()
