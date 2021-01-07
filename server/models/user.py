from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    hashed_id = db.Column(db.String(12), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    last_name = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    company = db.Column(db.String(150))
    job_title = db.Column(db.String(150))
    card = db.Column(db.JSON)
    hashed_password = db.Column(db.String(255), nullable=False)

    @id.setter
    def id(self, id):
        self.hashed_password = generate_password_hash(password)
        self.id = id

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
        }
