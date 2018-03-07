# Stream Two Final Project

## Project Brief

For my Stream Two Project, I chose to use the supplied brief as outlined below:

> I am running for office as the governor of the US state of Massachusetts. As part of my campaign, I would like to tell my potential voters about how bad the funding for education is in the state and what I would do to change it.

## Project Functionality

I chose to build a single page dashboard using Flask as backend, to serve the website and to collect the data stored in a MongoDB which the website will use to produce some charts. HTML and the Bootstrap framework provide the website with it's layout and responsive design and Keen Dashboards has been used for the Charts.

The navigation bar is always visible as you scroll down the page and uses the Bootstrap ScrollSpy to highlight where you are on the page and to allow easy navigation around the site. To the right of the navigation are two buttons, one which will allow you to reset any active filters currently in place on the charts, the other will launch the Guided Tour of the website. These buttons make use of Bootstraps Tooltip feature to show a helpful message when you hover the mouse over them.

The IntroJS help guide is availble from the main menu, will take you on a guided tour of each section of the website, explaining what each section and chart is about.

The charts are created using D3, DC, and Crossfilter to create an interactive section the user can use to play around with the data from the MongoDB. JQuery has been used to determine the width of each of the chart containers and used to set the width of the charts. A JQuery function is run every time the browser is resized, which updates the chart widths accordingly to make the charts as responsive as possible. 

## Techologies Used

* HTML
* CSS
	* Bootstrap v3.3.7
	* Keen Dashboards
* Fonts
	* FontAwesome 5.0.8 - [https://fontawesome.com](https://fontawesome.com)
	* Ovo - [https://fonts.google.com/specimen/Ovo](https://fonts.google.com/specimen/Ovo)
* Javascript
	* D3.js v3.5.3
	* DC.js v2.1.9
	* Crossfilter.js v1.3.5
	* Intro.js v2.7.0
	* Queue.js v1.0.7
	* Keen.js
	* JQuery v2.1.4
* Python
	* Flask v0.12.2
	* PyMongo v3.5.1

## Testing



## Deployment
