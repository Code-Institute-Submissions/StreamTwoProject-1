# Import libraries needed to format the data.
import pandas as pd


# get the data
projects = pd.read_csv('tmp/opendata_projects000.gz', 
						escapechar='\\', 
						names=[
							'_projectid', '_teacher_acctid', '_schoolid', 'school_ncesid', 
							'school_latitude', 'school_longitude', 'school_city', 'school_state', 
							'school_zip', 'school_metro', 'school_district', 'school_county', 
							'school_charter', 'school_magnet', 'school_year_round', 'school_nlns', 
							'school_kipp', 'school_charter_ready_promise', 'teacher_prefix', 
							'teacher_teach_for_america', 'teacher_ny_teaching_fellow', 
							'primary_focus_subject', 'primary_focus_area' ,'secondary_focus_subject', 
							'secondary_focus_area', 'resource_type', 'poverty_level', 'grade_level', 
							'vendor_shipping_charges', 'sales_tax', 'payment_processing_charges', 
							'fulfillment_labor_materials', 'total_price_excluding_optional_support', 
							'total_price_including_optional_support', 'students_reached', 
							'total_donations', 'num_donors', 'eligible_double_your_impact_match', 
							'eligible_almost_home_match', 'funding_status', 'date_posted', 
							'date_completed', 'date_thank_you_packet_mailed', 'date_expiration'
						])

# test the read and output the datatypes of the columns
# print projects.dtypes

# read all unique 'school_state' fields to check they are formatted correctly.
# print projects['school_state'].unique()

# filter the data for 'MA' entries only
mask = projects['school_state'] == 'MA'

projects = projects[mask]

# create a csv file of the data.
projects.to_csv('tmp/ma-project-data.csv', index=False)