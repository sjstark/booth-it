from .db import db

from server.utils.awsS3 import get_file_url
from server.utils.cipher_suite import encodeBoothId, decodeBoothId

Booth_Guests = db.Table(
    'booth_guests', # tablename
    db.Model.metadata, # metadata
    db.Column('booth_id',
                db.Integer,
                db.ForeignKey('booths.id'),
                primary_key=True),
    db.Column('user_id',
                db.Integer,
                db.ForeignKey('users.id'),
                primary_key=True)
)


class Booth(db.Model):
    __tablename__ = "booths"

    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'), nullable=False)
    company = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    primary_color = db.Column(db.String(8), nullable=True)
    secondary_color = db.Column(db.String(8), nullable=True)
    size_id = db.Column(db.Integer, db.ForeignKey('booth_sizes.id'))
    profile = db.Column(db.JSON)

    show = db.relationship("Show", backref="booths")

    # partners = db.relationship('User',
    #                             secondary=Booth_Partners,
    #                             backref="partnered_shows")

    guests = db.relationship('User',
                            secondary=Booth_Guests,
                            backref="visited_shows")



class Booth_Size(db.Model):
    __tablename__ = "booth_sizes"

    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(25), nullable=False)

    booths = db.relationship('Booth', backref="size")
