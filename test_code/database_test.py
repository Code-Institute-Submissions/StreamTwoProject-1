import pymongo
import json

# function to connect to the mongoDB
def mongo_connect():
	try:
		conn = pymongo.MongoClient()
		print "Mongo is connected!"
		return conn
	except pymongo.errors.ConnectionFailure, e:
		print "Could Not connect to MongoDB: %s" % e


# Connect to the database.
#conn = mongo_connect()
#db = conn['donorsMA']
#collection = db['projects']

# print a list of databases
#print "Name of available Databases %s \n\n" % conn.database_names()

# get record count
#print "Number of Records in 'projects' collection: %s \n\n" % collection.count()

# print a list of fields
#print "Fields Names in 'projects' collection: \n"
#record = collection.find_one()
#for key in record:
#	print key


# declare constant variables
MONGO_URI = 'mongodb://localhost:27017/'  # local host mongoDB
DB_NAME = 'donorsMA'
COLLECTION_NAME = 'projects'

FIELDS = {
		'_id': False,

		# date fields
		'date_posted': True,
		
		# focus area/subject fields
		'primary_focus_area': True,
		
		# school fields
		'grade_level' : True, 'school_city': True, 'school_county': True, 

		# project details
		'resource_type': True, 'poverty_level': True, 'num_donors': True, 
		'funding_status': True,

		# totals
		'total_donations': True
	}

# open a connection to the MongoDB
with pymongo.MongoClient(MONGO_URI) as conn:
	# define the collection to access
	collection = conn[DB_NAME][COLLECTION_NAME]

	# filter the results to only include the fields specified in the FIELDS constant
	# and limit to the first 22000 records
	projects = collection.find(projection=FIELDS, limit=22000)

	#print projects.count()
	print json.dumps(list(projects))
