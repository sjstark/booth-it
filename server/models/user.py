from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from server.utils.awsS3 import get_file_url


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    last_name = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    company = db.Column(db.String(150))
    job_title = db.Column(db.String(150))
    card = db.Column(db.JSON)
    hashed_password = db.Column(db.String(255), nullable=False)

    shows = db.relationship('Show', backref=db.backref("owner"))

    created_invites = db.relationship(
        "Show_Partner_Invite",
        backref= db.backref("creator"),
        foreign_keys="show_partner_invites.c.created_by"
        )
    accepted_invites = db.relationship(
        "Show_Partner_Invite",
        backref="accepted",
        foreign_keys="show_partner_invites.c.accepted_by"
        )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "company": self.company,
            "jobTitle": self.job_title,
            "profilePicUrl": get_file_url(f"users/{self.id}/profilePic.jpg")
        }
