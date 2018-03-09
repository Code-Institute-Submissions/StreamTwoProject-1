# import libraries to create Flask website
from flask import Flask, render_template, jsonify
from pymongo import MongoClient
import json
import os

from forms import ContactForm


# declare the app
app = Flask(__name__)
app.secret_key = 'jk90mBYzM9Gwr1AbX82n6c069FUiju'

# declare constant variables
MONGO_URI = 'mongodb://localhost:27017/'  # local host mongoDB
DB_NAME = 'donorsMA'
COLLECTION_NAME = 'projects'


# start the app
# app home page
@app.route('/')
def index():
	"""
	This is the home page of the website
	:return:
	"""
	form = ContactForm()
	return render_template("index.html", form=form)



# app route to request the data.
@app.route('/donor-data/get-data')
def get_donor_data():
	"""
	This function retrieves the data from the MongoDB and returns it in a JSON format.
	:return:
	"""

	# define the fields to return in the data set
	FIELDS = {
		# id fields
		'_id': False,

		# date fields
		'date_posted': True, 
		
		# focus area/subject fields
		'primary_focus_area': True,
		
		# school fields
		'grade_level' : True, 'school_county': True,

		# project details
		'resource_type': True, 'poverty_level': True, 'num_donors': True, 
		'funding_status': True,

		# totals
		'total_donations': True
	}

	# open a connection to the MongoDB
	with MongoClient(MONGO_URI) as conn:
		# define the collection to access
		collection = conn[DB_NAME][COLLECTION_NAME]

		# filter the results to only include the fields specified in the FIELDS constant
		# and limit to the first 22000 records
		projects = collection.find(projection=FIELDS, limit=22000)

		# convert the projects to a JSON object and return the data
		return json.dumps(list(projects))


# app route for submitting the contact form.
@app.route('/submit', methods=['post'])
def submitForm():
	# get the form.
	form = ContactForm();

	# check if form is valid.
	if form.validate():
		return jsonify(data=form.data)
	else:
		return jsonify(data=form.errors), 300


# check if app name is __main__ and run app if it is.
if __name__ == '__main__':
	app.run()
