# import libraries to create Flask website
from flask import Flask, render_template
from pymongo import MongoClient
import json
import os


# declare the app
app = Flask(__name__)

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
	return render_template("index.html")



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


# check if app name is __main__ and run app if it is.
if __name__ == '__main__':
	app.run()
