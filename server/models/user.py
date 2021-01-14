from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from server.utils.awsS3 import *


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
    has_picture = db.Column(db.Boolean, default=False)

    @property
    def password(self):
        return self.hashed_password

    def upload_picture(self, file_buffer):
        upload_file_to_s3(file_buffer, f"users/{self.id}/profilePic.jpg")
        self.has_picture = True
        db.session.commit()
        return

    @property
    def profilePicUrl(self):
        if self.has_picture:
            return get_file_url(f"users/{self.id}/profilePic.jpg")
        return None

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
            "profilePicUrl": self.profilePicUrl
        }
