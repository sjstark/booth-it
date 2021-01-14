import re

from flask_wtf import FlaskForm
from wtforms import StringField, FileField, DateField, TimeField, BooleanField
from wtforms.validators import DataRequired, Optional, Regexp, Length


hex_color_pattern=re.compile("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{8})$")


class BoothCreateForm(FlaskForm):
    company = StringField(
        'company',
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=150,
                message="Title must be between 4 and 150 characters in length"
            )
        ]
    )

    description = StringField(
        'description',
        validators=[
            DataRequired(),
            Length(
                min=10,
                max=500,
                message="Description must be between 10 and 500 characters in length"
            )
        ]
    )

    primaryColor = StringField(
        'primaryColor',
        validators=[
            Optional(),
            Regexp(
                hex_color_pattern,
                message="Color must be a 6 or 8 digit hexadecimal color with a leading #"
            )
        ]
    )

    secondaryColor = StringField(
        'secondaryColor',
        validators=[
            Optional(),
            Regexp(
                hex_color_pattern,
                message="Color must be a 6 or 8 digit hexadecimal color with a leading #"
            )
        ]
    )

    isPrivate = BooleanField('isPrivate')

    boothLogo = FileField('boothLogo')
