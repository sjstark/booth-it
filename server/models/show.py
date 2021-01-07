from .db import db

from server.utils.awsS3 import get_file_url
from server.utils.cipher_suite import encodeShowId, decodeShowId


# Show_Partners = db.Table(
#     'show_partners', # tablename
#     db.Model.metadata, # metadata
#     db.Column('show_id',
#                 db.Integer,
#                 db.ForeignKey('shows.id'),
#                 primary_key=True),
#     db.Column('booth_id'
#                 db.Integer,
#                 db.ForeignKey('booths.id'),
#                 primary_key=True),
#     db.Column('user_id',
#                 db.Integer,
#                 nullable=True)
# )


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
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    primary_color = db.Column(db.String(8), nullable=True)
    secondary_color = db.Column(db.String(8), nullable=True)
    is_private = db.Column(db.Boolean, default=False)

    dates = db.relationship('Show_Date', backref="show")

    # partners = db.relationship('User',
    #                             secondary=Show_Partners,
    #                             backref="partnered_shows")

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
            "showLogoURL": get_file_url(f"shows/{self.hashedId}/logo.png")
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
