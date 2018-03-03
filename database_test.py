import pymongo

# function to connect to the mongoDB
def mongo_connect():
	try:
		conn = pymongo.MongoClient()
		print "Mongo is connected!"
		return conn
	except pymongo.errors.ConnectionFailure, e:
		print "Could Not connect to MongoDB: %s" % e


# Connect to the database.
conn = mongo_connect()
db = conn['donorsMA']
collection = db['projects']

# print a list of databases
print "Name of available Databases %s \n\n" % conn.database_names()

# get record count
print "Number of Records in 'projects' collection: %s \n\n" % collection.count()

# print a list of fields
print "Fields Names in 'projects' collection: \n"
record = collection.find_one()
for key in record:
	print key
