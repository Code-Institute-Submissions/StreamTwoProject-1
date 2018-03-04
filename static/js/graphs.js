/*!
 * use d3.queue to collect the data and then call the buildGraphs functions once the data is generated.
 */
queue()
	.defer(d3.json, "/donor-data/get-data")
	.await(buildGraphs);

/*!
 * This function uses the data gathered from the database to build the website dashboard.
 * The data is used to produce a crossfilter enabled graph system.
 */
function buildGraphs(error, donorMAProjects) {
	// if an error occurs, throw an error.
	if (error) {
		// log the error in the console.
		console.error("error encountered when recieving dataset: ", error.statusText);
		throw error;
	}

	// define data formats.
	var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
	var numberFormat = d3.format("d");

	// optimise the data.
	donorMAProjects.forEach(function(d) {
		d["date_posted"] = dateFormat.parse(d["date_posted"]); // format the date posted to the specified format
		d["date_posted"].setDate(1); // set all days to be first of the month
		d["num_donors"] = +d["num_donors"];
		d["total_donations"] = +d["total_donations"];
	});

	// create a crossfilter instance.
	var ndx = crossfilter(donorMAProjects);

	// define the dimensions:
	// yearly dimension.
	var yearDim = ndx.dimension(function(d) {
		return d3.time.year(d["date_posted"]).getFullYear();
	});

	// date dimension.
	var dateDim = ndx.dimension(function(d) {
		return d["date_posted"];
	});

	// number of donations dimension.
	var numDonationDim = ndx.dimension(function(d) {
		return d["num_donors"];
	});

	// school county dimension
	var schoolCountyDim = ndx.dimension(function(d) {
		return d["school_county"];
	});

	// primary focus area dimension.
	var primaryFocusDim = ndx.dimension(function(d) {
		return d["primary_focus_area"];
	});

	// resource type dimension.
	var resourceTypeDim = ndx.dimension(function(d) {
		return d["resource_type"];
	});

	// total donations dimensions.
	var totalDonationsDim = ndx.dimension(function(d) {
		return d["total_donations"];
	});

	// get values to set axis
	var minYear = yearDim.bottom(1)[0]["date_posted"];
	var maxYear = yearDim.top(1)[0]["date_posted"];

	// calculate metrics.
	var yearGroup = yearDim.group();
	var countyGroup = schoolCountyDim.group();
	var focusGroup = primaryFocusDim.group();
	var resourceGroup = resourceTypeDim.group();

	var numDonorsByDate = dateDim.group().reduceSum(function(d) {
		return d["num_donors"];
	});
	var numDonorsByYear = yearDim.group().reduceSum(function(d) {
		return d["num_donors"];
	});
	var totalDonationsByDate = dateDim.group().reduceSum(function(d) {
		return d["total_donations"];
	});
	var numDonorsByCounty = schoolCountyDim.group().reduceSum(function(d) {
		return d["num_donors"];
	});
	var all = ndx.groupAll();

	// define charts.
	var barNumDonors = dc.barChart('#bar-number-donors');
	var rowNumDonorsCounty = dc.rowChart('#row-donors-by-county');

	// get width of container objects to set width of graphs
	var widthBarNumDonors = $('#chart1').width();
	var widthRowNumDonorsCounty = $('#chart2').width();

	// build the charts.
	barNumDonors
		.width(widthBarNumDonors)
		.height(500)
		.margins({top: 20, right: 20, bottom: 50, left: 70})
		.colors(d3.scale.category20c())
		.dimension(dateDim)
		.group(totalDonationsByDate)
		.x(d3.time.scale().domain([minYear, maxYear]))
		.xUnits(d3.time.months)
		.transitionDuration(500)
		.elasticY(true)
		.elasticX(true)
		.brushOn(true)
		.xAxisLabel("Date of Donation")
		.yAxisLabel("Total Donations in $")
		.yAxis().ticks(10);
	
	rowNumDonorsCounty
		.width(widthRowNumDonorsCounty)
		.height(500)
		.margins({top: 20, right: 20, bottom: 20, left: 20})
		.colors(d3.scale.category20c())
		.transitionDuration(500)
		.dimension(schoolCountyDim)
		.group(numDonorsByCounty)
		.xAxis().ticks(5);


	// render the charts and filters
	dc.renderAll();

	// on window resize
	window.onresize = function(event) {
		var newWidthBarNumDonors = $('#chart1').width();
		var newWidthRowNumDonorsCounty = $('#chart2').width();
		
		barNumDonors
			.width(newWidthBarNumDonors);
	  	
	  	rowNumDonorsCounty
	  		.width(newWidthRowNumDonorsCounty);

	  	dc.renderAll();
	};
}

