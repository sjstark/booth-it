from server.models import *

def seed_booth_sizes():
    large_size = Booth_Size(size="large")
    medium_size = Booth_Size(size="medium")


    db.session.add(large_size)
    db.session.add(medium_size)


    db.session.commit()


def undo_booth_sizes():
    db.session.execute('TRUNCATE booth_sizes RESTART IDENTITY CASCADE;')
    db.session.commit()
