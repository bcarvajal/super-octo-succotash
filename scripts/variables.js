'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */

var plotData;
var plotCache;
var plotColors;

var devcounter;
var webserviceURL;
var linkFromTheAbyss;
var enablePlotCaching;
var plotInOnlyOneGraph;
var enableCarouselView;
var predictionInterval;

window.onload = function () {

	document.getElementsByTagName('title')[0].innerHTML = 'WineAI';

	if ( location.protocol !== 'http:' ) {

		location.href = 'http:' + window.location.href.substring( window.location.protocol.length );
		return;
	}

	plotData = null;
	plotCache = null;
	plotColors = [
		'233,30,99',
		'0,150,136',
		'103, 58, 183',
		'255,62,31',
		'255, 152, 0',
		'7, 174, 21',
		'156, 39, 176'];

	devcounter = 0;
	linkFromTheAbyss = null;
	enablePlotCaching = false;
	plotInOnlyOneGraph = false;
	enableCarouselView = false;
	predictionInterval;

	var n;
	var xhr;

	n = parseInt(window.getCookie('prediction_interval'));

	if ( !isNaN(n) ) {
		
		predictionInterval = n;
	}
	else {
		
		predictionInterval = 1000 * 60 * 60 * 12;
	}

	n = parseInt(window.getCookie('devcounter'));

	if ( !isNaN(n) ) {

		devcounter = n;
	}
	
	n = window.getCookie('webserviceURL');

	if ( n !== '' ) {
		
		webserviceURL = n;

		xhr = new XMLHttpRequest();
		xhr.onload = function() {

			predictionInterval = parseInt(this.responseText);

			if ( isNaN( predictionInterval ) ) {

				predictionInterval = 1000 * 60 * 60 * 12;
			}
		};
		xhr.onloadend = function() {

			if( xhr.status !== 200 ) {

				predictionInterval = 1000 * 60 * 60 * 12;
			}
		};
		xhr.open('GET', 'BackEnd/var/getValue.php?variable=PREDICCION_INTERVALO', true);
		xhr.send();
	}
	else {

		xhr = new XMLHttpRequest();
		xhr.onload = function() {

			if ( this.responseText !== '' ) {

				webserviceURL = this.responseText;
			}
			else {

				webserviceURL = 'BackEnd';
			}
			xhr = new XMLHttpRequest();
			xhr.onload = function() {

				predictionInterval = parseInt(this.responseText);

				if ( isNaN( predictionInterval ) ) {

					predictionInterval = 1000 * 60 * 60 * 12;
				}
			};
			xhr.onloadend = function() {

				if( xhr.status !== 200 ) {

					predictionInterval = 1000 * 60 * 60 * 12;
				}
			};
			xhr.open('GET', 'BackEnd/var/getValue.php?variable=PREDICCION_INTERVALO', true);
			xhr.send();
		};
		xhr.onloadend = function() {

			if( xhr.status !== 200 ) {

				console.log('Setting Default Webservice for Error: ' + xhr.status);
				webserviceURL = 'http://' + location.hostname + '/WineAI/BackEnd';
			}
		};
		xhr.open('GET', 'BackEnd/var/getValue.php?variable=WEBSERVICE_URL', true);
		xhr.send();
	}

};
