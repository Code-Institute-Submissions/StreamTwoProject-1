# Stream Two Final Project

## Project Brief

For my Stream Two Project, I chose to use the supplied brief as outlined below:

> I am running for office as the governor of the US state of Massachusetts. As part of my campaign, I would like to tell my potential voters about how bad the funding for education is in the state and what I would do to change it.

## Project Functionality

I chose to build a single page dashboard using Flask as the back-end. Flask is used to serve the website and to serve the data stored in a Mongo database using PyMongo. The website uses this data to produce some charts. HTML and the Bootstrap framework provide the website with its layout and responsive design and Keen Dashboards has been used for the Charts.

The navigation bar is always visible as you scroll down the page and uses the Bootstrap ScrollSpy to highlight where you are on the page and to allow easy navigation around the site. To the right of the navigation are two buttons, one which will allow you to reset any active filters currently in place on the charts, the other will launch the Guided Tour of the website. These buttons make use of Bootstraps Tooltip feature to show a helpful message when you hover the mouse over them.

The IntroJS help guide is available from the main menu, will take you on a guided tour of each section of the website, explaining what each section and chart is about.

The charts are created using D3, DC, and Crossfilter to create an interactive section the user can use to play around with the data from the MongoDB. JQuery has been used to determine the width of each of the chart containers and used to set the width of the charts. A JQuery function is run every time the browser is resized, which updates the chart widths accordingly to make the charts as responsive as possible. 

JQuery is also used to inject Bootstrap CSS to the 3 selectMenu's created using DC.

Custom CSS was created to change the look and feel of the site.

[jsSocials](http://js-socials.com) was used to generate the sharing links used page.

The contact form in the footer uses Flask-WTF to produce the form and a JQuery Ajax function to handle form submission, all form validation is handled by the server, any validation errors are returned in a JSON object, looped through and JQuery is used to display the errors to the user. The form doesn't send any e-mails, but uses a setTimeout() function to simulate the effect.

## Git Branches

### master

This branch contains all the code which I have written myself as well as any images and test_code files used to create the project.

### heroku-deploy

This branch contains the full copy of the website (including any external code files) that the site needs to run and is linked to the Heroku app for automatic deployment.

## Technologies Used

* __HTML__
* __CSS__
	* Bootstrap v3.3.7
	* Keen Dashboards
* __Fonts__
	* FontAwesome 5.0.8 - [https://fontawesome.com](https://fontawesome.com)
	* Ovo - [https://fonts.google.com/specimen/Ovo](https://fonts.google.com/specimen/Ovo)
* __JavaScript__
	* D3.js v3.5.3
	* DC.js v2.1.9
	* Crossfilter.js v1.3.5
	* Intro.js v2.7.0
	* Queue.js v1.0.7
	* Keen.js
	* JQuery v2.1.4
	* jsSocials v1.4.0 [http://js-socials.com](http://js-socials.com)
* __Python__
	* Flask v0.12.2
	* WTForms v2.1
	* Flask-WTF v0.14.2
	* PyMongo v3.5.1

## Testing



## Deployment

The project has been deployed to Heroku at the following address: [https://rocky-tor-55350.herokuapp.com](https://rocky-tor-55350.herokuapp.com). This app shows the latest deployment from the "heroku-deploy" branch.
