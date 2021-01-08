from .db import db

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

    dates = db.relationship('Show_Date', backref="show")

    guests = db.relationship('User',
                            secondary=Show_Guests,
                            backref="visited_shows")


    def to_dict(self):
        return {
            "id": encodeShowId(self.id),
            "ownerId": self.owner_id,
            "title": self.title,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "showLogoURL": get_file_url(f"shows/{encodeShowId(self.id)}/logo.png")
        }

    def to_dict_full(self):
        return {
            "id": encodeShowId(self.id),
            "owner": self.owner.to_dict(),
            "title": self.title,
            "description": self.description,
            "primaryColor": self.primary_color,
            "secondaryColor": self.secondary_color,
            "isPrivate": self.is_private
        }


class Show_Date(db.Model):
    __tablename__ = "show_dates"

    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    def to_dict(self):
        return {
            "date": self.date,
            "startTime": self.start_time,
            "endTime": self.end_time
        }


class Show_Partner_Invite(db.Model):
    __tablename__ = "show_partner_invites"

    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'), nullable=False)
    booth_id = db.Column(db.Integer, db.ForeignKey('booths.id'), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    accepted_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)



    booth = db.relationship("Booth", backref="invites")
    show = db.relationship("Show", backref="invites")


    def is_open(self):
        return not bool(self.accepted_by)


    def is_valid_invite(self, IID, BID):
        """
        Instance method to check if supplied query parameters are valid for the selected invite.
        invite id (IID) should already be correct by the query to get the invite, this method checks that
        booth id (BID) is correct as well as that the invite has not already been accepted.
        """
        if ((decodeInviteId(IID) == self.id) and (decodeBoothId(BID) == self.booth_id)):
            return self.is_open()
        return False


    @classmethod
    def get_invite(cls, IID):
        invite_id = decodeInviteId(IID)
        return db.query.get(invite_id)


    def to_dict(self):
        return {
            "id": encodePartnerId(self.id),
            "showId": encodeShowId(self.show_id),
            "boothId": encodeBoothId(self.booth_id),
            "creator_id": self.created_by,
            "isAccepted": bool(self.accepted_by)
        }
