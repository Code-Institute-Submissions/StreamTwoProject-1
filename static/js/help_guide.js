/*!
 * This function builds the help guide used by the site to describe each section
 */
function startHelpGuide(stepNumber) {
	
	// declare the intro.
	var helpGuide = introJs();

	// get the width of the window.
	var windowWidth = $(window).width();

	/*!
	 * Set the First steps used by the help guide.
	 */
	helpGuide.addSteps([
		// step 1
		{
			element: '#navbar',
			intro: "<h3>Navigation</h3>This is the <b>navigation bar</b>, it will remain at the <b>top</b> of the screen and allow you to easily navigate around the page",
			position: 'bottom'
		},

		// step 2
		{
			element: '#welcome',
			intro: "<h3>Welcome</h3>This is the opening of the website",
			position: 'bottom'
		},

		// step 3
		{
			element: '#charts',
			intro: "<h3>Charts</h3>This section of the website contains various charts, showing the donations made to various eductaion projects between 2007 and 2016. All the charts in this section are <b>interactive</b>."
		},

		// step 4
		{
			element: '#chartFilters',
			intro: "<h3>Chart Filters</h3>You can use these drop downs to filter the charts by year, poverty level and project funding status.",
			position: 'bottom'
		}
	]);

	/*!
	 * Check the width of the window, if below 767 pixels, configure the intro for a mobile device.
	 */
	if ($(window).width() < 767)
	{
		// step 5 - mobile browser.
		helpGuide.addStep({
			element: '#mobile-reset-filter',
			intro: "<h3>Reset Charts</h3>Use this button if you want to clear all the filters you currently have in place on the charts",
			position: 'bottom'
		});
	} else {
		// step 5 - other browser.
		helpGuide.addStep({
			element: '#reset-filter',
			intro: "<h3>Reset Charts</h3>Use this button if you want to clear all the filters you currently have in place on the charts",
			position: 'bottom'
		});
	}

	/*!
	 * Add the rest of the steps used by the help guide
	 */
	helpGuide.addSteps([
		// step 6
		{
			element: '#step4',
			intro: "<h3>Donations by Year</h3>This chart shows the <b>total donations made by year</b>. You can click and drag with your mouse on this chart to select a date range which will update the other charts on the page.",
			position: 'right'
		},

		// step 7
		{
			element: '#step5',
			intro: "<h3>Projects By County</h3>This chart shows the <b>number of projects per county</b>, you can click on any of the bars to show data from that county on the other charts. You can select as many bars as you like.",
			position: 'left'
		},

		// step 8
		{
			element: '#step6',
			intro: "<h3>Projects By Focus Area</h3>This chart shows the <b>primary focus area of a project</b> and how many projects were created for that area.",
			position: 'right'
		},

		// step 9
		{
			element: '#step7',
			intro: "<h3>Project Resource Types</h3>This chart show the <b>resource types</b> each education project aims to provide. You can select any slice of the pie chart to update the other chats on this page.",
			position: 'left'
		},

		// step 10
		{
			element: '#step8',
			intro: "<h3>Projects By Grade</h3>This chart show the various school grades and how many projects have been targeted at them. You can select any bar on the chart to update the other charts.",
			position: 'left'
		},

		// step 11
		{
			element: '#totalRow',
			intro: '<h3>Totals</h3>This section shows the total number of projects, total number of donoations made, and the total amount raised in $. These numbers will update automatically to reflect changes made by the charts.',
			position: 'bottom'
		},

		// step 12
		{
			element: '#aim',
			intro: '<h3>Our Aim</h3>This section of the site conveys what I intend to do about the education funding in the state.'
		}
	]);

	/*!
	 * Set the Options used by the Help Guide.
	 */
	helpGuide.setOptions({
		showProgress: true,
		skipLabel: 'Exit Tour'
	});
		
	/*!
	 * Evaluate the stepNumber provided by the function call.
	 * if 0, start the guide from the start.
	 */
	if (stepNumber == 0) {
		// start the guide.
		helpGuide.start();
	} else {
		// jump to step number.
		helpGuide.start().goToStep(stepNumber);
	}
}