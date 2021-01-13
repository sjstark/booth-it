from .db import db

from datetime import datetime

from server.utils.awsS3 import get_file_url
from server.utils.cipher_suite import *



Show_Guests = db.Table(
    'show_guests', # tablename
    db.Model.metadata, # metadata
    db.Column('show_id',
                db.Integer,
                db.ForeignKey('shows.id'),
                primary_key=True),
    db.Column('user_id',
                db.Integer,
                db.ForeignKey('users.id'),
                primary_key=True)
)


class Show(db.Model):
    __tablename__ = "shows"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    primary_color = db.Column(db.String(9), nullable=True)
    secondary_color = db.Column(db.String(9), nullable=True)
    is_private = db.Column(db.Boolean, default=False)

    owner = db.relationship('User', backref=db.backref("shows", cascade="all, delete-orphan"))

    # invites = db.relationship("Show_Partner_Invite", backref=db.backref("show", cascade="all, delete-orphan"))

    # dates = db.relationship(
    #     'Show_Date',
    #     backref= db.backref(
    #         "show",
    #         cascade="all, delete-orphan",
    #         single_parent=True
    #     ))

    guests = db.relationship('User',
                            secondary=Show_Guests,
                            backref= db.backref("visited_shows",
                                cascade="all, delete-orphan",
                                single_parent=True
                                ))

    @property
    def SID(self):
        return encodeShowId(self.id)


    def to_dict(self):
        return {
            "SID": self.SID,
            # "ownerId": self.owner_id,
            "title": self.title,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "showLogoURL": get_file_url(f"shows/{self.SID}/logo.png"),
            "startDate": min(self.dates).date.strftime("%m/%d/%Y"),
            "endDate": max(self.dates).date.strftime("%m/%d/%Y")
        }

    def to_dict_full(self):
        return {
            "SID": self.SID,
            # "owner": self.owner.to_dict(),
            "title": self.title,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "isPrivate": self.is_private,
            "showLogoURL": get_file_url(f"shows/{self.SID}/logo.png"),
            "booths": [booth.to_dict() for booth in self.booths],
            "dates": [date.to_dict() for date in self.dates],
            "startDate": min(self.dates).date.strftime("%m/%d/%Y"),
            "endDate": max(self.dates).date.strftime("%m/%d/%Y")
        }


class Show_Date(db.Model):
    __tablename__ = "show_dates"

    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    show = db.relationship(
        'Show',
        backref= db.backref(
            "dates",
            cascade="all, delete-orphan",
        ))

    def to_dict(self):
        return {
            "date": self.date.strftime("%m/%d/%Y"),
            "startTime": self.start_time.strftime("%H:%M"),
            "endTime": self.end_time.strftime("%H:%M")
        }

    def date_in(self, array):
        for x in array:
            print(x)
            if ((x['date'] == self.date)
            and (x['startTime'] == self.start_time)
            and (x['endTime'] == self.end_time)):
                return x
        return None

    # Methods for comparison to enable max(show_dates)
    def __eq__(self, other):
        return self.date == other.date

    def __gt__(self, other):
        return self.date > other.date

    def __ge__(self, other):
        return self.date >= other.date

    def __lt__(self, other):
        return self.date < other.date

    def __le__(self, other):
        return self.date <= other.date


class Show_Partner_Invite(db.Model):
    __tablename__ = "show_partner_invites"

    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'), nullable=False)
    booth_id = db.Column(db.Integer, db.ForeignKey('booths.id'), nullable=True)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    accepted_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    booth = db.relationship("Booth", backref=db.backref("invites", cascade="all, delete-orphan"))
    show = db.relationship("Show", backref=db.backref("invites", cascade="all, delete-orphan"))

    creator = db.relationship(
        "User",
        backref= db.backref("created_invites", cascade="all, delete-orphan"),
        foreign_keys="show_partner_invites.c.created_by"
        )

    acceptee = db.relationship(
        "User",
        backref=db.backref("accepted_invites", cascade="all, delete-orphan"),
        foreign_keys="show_partner_invites.c.accepted_by"
        )

    def is_open(self):
        return not bool(self.accepted_by)


    @classmethod
    def get_invite(cls, IID):
        invite_id = decodeInviteId(IID)
        return db.query.get(invite_id)

    @property
    def IID(self):
        return encodeInviteId(self.id)

    @property
    def url(self):
        return f"/invites?IID={self.IID}&SID={self.show.SID}" + (
            ("&BID="+self.booth.BID) if self.booth else ""
        )

    def to_dict(self):
        return {
            "IID": self.IID,
            "SID": self.show.SID,
            "show": self.show.title,
            "BID": self.booth.BID if self.booth else None,
            "booth": self.booth.company if self.booth else None,
            "creator_id": self.created_by,
            "isAccepted": bool(self.accepted_by),
            "url": self.url
        }
