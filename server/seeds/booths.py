from werkzeug.security import generate_password_hash

from server.models import *
from server.utils.faker import fake
from server.utils.pydenticon import create_company_logo
from server.utils.cipher_suite import *
from server.utils.awsS3 import upload_file_to_s3

import time


def seed_booths():
    demoUsers = User.query.all()
    shows = Show.query.all()
    booth_sizes = Booth_Size.query.all()

    for show in shows:
        for _ in range(fake.random_int(min=15, max=30)):
            booth = Booth(
                show = show,
                company = fake.company(),
                description = fake.catch_phrase(),
                primary_color = fake.hex_color(),
                secondary_color = fake.hex_color(),
                size = fake.random_element(booth_sizes),
            )
            employees = fake.random_elements(elements=demoUsers, length=fake.random_int(min=1, max=4), unique=True)
            for employee in employees:
                booth.employees.append(employee)

            db.session.add(booth)
            db.session.commit() # Commit on each booth in order to get booth.id

            logo = create_company_logo(booth.company, booth.primary_color, booth.secondary_color)

            booth.upload_picture(logo)
            db.session.commit()



# Uses a raw SQL query to TRUNCATE the booths table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_booths():
    db.session.execute('TRUNCATE booths RESTART IDENTITY;')
    db.session.commit()
