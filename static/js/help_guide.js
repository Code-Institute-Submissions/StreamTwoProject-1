/*!
 * This function builds the help guide used by the site to describe each section
 */
function startHelpGuide() {
	
	// declare the intro.
	var helpGuide = introJs();

	// set the steps and options used by the help guide.
	helpGuide.setOptions({
		steps: [
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
				element: '#step4',
				intro: "<h3>Donations by Year</h3>This chart shows the <b>total donations made by year</b>. You can click and drag with your mouse on this chart to select a date range which will update the other charts on the page.",
				position: 'right'
			},

			// step 5
			{
				element: '#step5',
				intro: "<h3>Donors By County</h3>This chart shows the <b>number of donors per county</b>, you can click on any of the bars to show data from that county on the other charts. You can select as many bars as you like.",
				position: 'left'
			},

			// step 6
			{
				element: '#step6',
				intro: "<h3>Projects By Focus Area</h3>This chart shows the <b>primary focus area of a project</b> and how many projects were created for that area.",
				position: 'right'
			},

			// step 7
			{
				element: '#step7',
				intro: "<h3>Project Funding Status</h3>This chart show the <b>funding status</b> of the education projects. You can select any slice of the pie chart to update the other chats on this page.",
				position: 'top'
			},

			// step 8
			{
				element: '#step8',
				intro: "<h3>Projects By Grade</h3>This chart show the various school grades and how many projects have been targeted at them. You can select any bar on the chart to update the other charts.",
				position: 'left'
			},

			// step 9
			{
				element: '#reset-filter',
				intro: "<h3>Reset Charts</h3>Use this button if you want to clear all the filters you currently have in place on the charts",
				position: 'bottom'
			}
		]
	});

	// start the guide.
	helpGuide.start();
}