from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, validators


class ContactForm(FlaskForm):
	fullName = StringField('Your Name:', [validators.Required()])
	emailAddress = StringField('E-Mail Address:', [validators.Required(), validators.Email()])
	yourMessage = TextAreaField('Your Message:', [validators.Required()])
