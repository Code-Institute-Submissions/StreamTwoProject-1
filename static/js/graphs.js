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

	// funding status dimension.
	var fundingStatusDim = ndx.dimension(function(d) {
		return d["funding_status"];
	})

	// get values to set axis
	var minYear = yearDim.bottom(1)[0]["date_posted"];
	var maxYear = yearDim.top(1)[0]["date_posted"];

	// calculate metrics.
	var countyGroup = schoolCountyDim.group();
	var focusGroup = primaryFocusDim.group();
	var resourceGroup = resourceTypeDim.group();
	var fundingStatusGroup = fundingStatusDim.group();

	var totalDonationsByDate = dateDim.group().reduceSum(function(d) {
		return d["total_donations"];
	});
	var numDonorsByCounty = schoolCountyDim.group().reduceSum(function(d) {
		return d["num_donors"];
	});
	var all = ndx.groupAll();

	// define charts.
	var lineTotalDonoationYear = dc.lineChart('#line-total-donoation-by-year');
	var rowNumDonorsCounty = dc.rowChart('#row-donors-by-county');
	var rowProjectsByFocusArea = dc.rowChart('#row-projects-by-focus-area');
	var pieFundingStatus = dc.pieChart('#pie-funding-status');

	// get width of container objects to set width of graphs
	var widthChart1 = $('#chart1').width();
	var widthChart2 = $('#chart2').width();
	var widthChart3 = $('#chart3').width();
	var widthChart4 = $('#chart4').width();

	// build the charts.
	/*!
	 * Chart 1
	 * Bar Chart showing the total donations by year.
	 */
	lineTotalDonoationYear
		.width(widthChart1)
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
		.renderArea(true)
		.xAxisLabel("Date of Donation")
		.yAxisLabel("Total Donations in $")
		.yAxis().ticks(10);
	
	/*!
	 * Chart 2
	 * Row Chart showing the number of donors by shcool county
	 */
	rowNumDonorsCounty
		.width(widthChart2)
		.height(500)
		.margins({top: 20, right: 20, bottom: 20, left: 20})
		.colors(d3.scale.category20c())
		.transitionDuration(500)
		.dimension(schoolCountyDim)
		.group(numDonorsByCounty)
		.xAxis().ticks(5);

	/*!
	 * Chart 3
	 * Row Chart showing the number of projects by Focus area
	 */
	rowProjectsByFocusArea
		.width(widthChart3)
		.height(widthChart3)
		.margins({top: 20, right: 20, bottom: 20, left: 20})
		.colors(d3.scale.category20c())
		.transitionDuration(500)
		.dimension(primaryFocusDim)
		.group(focusGroup)
		.xAxis().ticks(5);

	/*!
	 * Chart 4
	 * Pie Chart showing the funding status of the projects
	 */
	pieFundingStatus
		.width(widthChart4)
		.height(widthChart4)
		.colors(d3.scale.category20c())
		.transitionDuration(500)
		.radius(widthChart4 - 40)
		.dimension(fundingStatusDim)
		.group(fundingStatusGroup);



	// render the charts and filters
	dc.renderAll();

	// on window resize
	window.onresize = function(event) {
		var newWidthChart1 = $('#chart1').width();
		var newWidthChart2 = $('#chart2').width();
		var newWidthChart3 = $('#chart3').width();
		var newWidthChart4 = $('#chart4').width();
		
		lineTotalDonoationYear
			.width(newWidthChart1);
	  	
	  	rowNumDonorsCounty
	  		.width(newWidthChart2);

	  	rowProjectsByFocusArea
	  		.width(newWidthChart3);

	  	pieFundingStatus
	  		.width(newWidthChart4)
	  		.height(newWidthChart4)
	  		.radius(newWidthChart4 - 40);

	  	dc.renderAll();
	};
}

