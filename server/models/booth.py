from .db import db

from server.utils.awsS3 import *
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
    description = db.Column(db.String(500), nullable=True)
    primary_color = db.Column(db.String(9), nullable=True)
    secondary_color = db.Column(db.String(9), nullable=True)
    size_id = db.Column(db.Integer, db.ForeignKey('booth_sizes.id'))
    profile = db.Column(db.JSON)
    has_picture = db.Column(db.Boolean, default=False)


    show = db.relationship("Show", backref=db.backref("booths", cascade="all, delete-orphan"))

    guests = db.relationship('User',
                            secondary=Booth_Guests,
                            backref=db.backref("visited_booths",
                                cascade="all, delete-orphan",
                                single_parent=True
                            ))

    employees = db.relationship('User',
                                secondary=Booth_Employees,
                                backref=db.backref("assigned_booths",
                                    cascade="all, delete-orphan",
                                    single_parent=True
                                ))

    @property
    def BID(self):
        return encodeBoothId(self.id)

    @property
    def boothLogoUrl(self):
        if self.has_picture:
            return get_file_url(f"shows/{self.show.SID}/booths/{self.BID}/logo.png")
        return None

    def upload_picture(self, file_buffer):
        upload_file_to_s3(file_buffer, f"shows/{self.show.SID}/booths/{self.BID}/logo.png")
        self.has_picture = True
        db.session.commit()
        return

    def to_dict(self):
        return {
            "BID": self.BID,
            "SID": self.show.SID,
            "company": self.company,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "size": self.size.to_string(),
            "profile": self.profile,
            "boothLogoURL": self.boothLogoUrl
        }


    def to_dict_full(self):
        return {
            "BID": self.BID,
            "SID": self.show.SID,
            "company": self.company,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "size": self.size.to_string(),
            "profile": self.profile,
            "boothLogoURL": self.boothLogoUrl,
            "employees": [employee.to_dict() for employee in self.employees]
        }



class Booth_Size(db.Model):
    __tablename__ = "booth_sizes"

    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(25), nullable=False)

    booths = db.relationship('Booth', backref="size")

    def to_string(self):
        return self.size
