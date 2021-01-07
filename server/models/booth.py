from .db import db

from server.utils.awsS3 import get_file_url
from server.utils.cipher_suite import *


Booth_Employees = db.Table(
    'booth_employees', # tablename
    db.Model.metadata, # metadata
    db.Column('booth_id',
                db.Integer,
                db.ForeignKey('booths.id'),
                primary_key=True),
    db.Column('employee_id',
                db.Integer,
                db.ForeignKey('users.id'),
                primary_key=True)
)


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

    guests = db.relationship('User',
                            secondary=Booth_Guests,
                            backref="visited_shows")

    employees = db.relationship('User',
                                secondary=Booth_Employees,
                                backref="assigned_booths")

    def to_dict(self):
        return {
            "id": encodeBoothId(self.id),
            "showId": encodeShowId(self.show_id),
            "company": self.company,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "size": self.size.to_string(),
            "profile": self.profile,
        }



class Booth_Size(db.Model):
    __tablename__ = "booth_sizes"

    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(25), nullable=False)

    booths = db.relationship('Booth', backref="size")

    def to_string(self):
        return self.size
