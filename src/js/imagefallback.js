/*
	Source:
	van Creij, Maurice (2018). "imagefallback.js: Replace missing images", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var ImageFallback = function (config) {

	// PROPERTIES

	if (/imagefallback=on/i.test(document.location.href)) {
		localStorage.setItem('ImageFallback', 'on');
	}

	if (/imagefallback=off/i.test(document.location.href)) {
		localStorage.setItem('ImageFallback', 'off');
	}

	this.config = {
		'active': (localStorage.getItem('ImageFallback')=='on'),
		'images': 'img',
		'backgrounds': '[style*="background-image"]',
		'url': 'https://picsum.photos/800/600'
	}

	for (var name in config) { this.config[name] = config[name] }

	// METHODS

	this.checkImages = function(elements) {
		for (var a = 0, b = elements.length; a < b; a += 1) {
			// catch load errors
			elements[a].onerror = this.onImageError.bind(this, elements[a]);
		}
	};

	this.checkBackgrounds = function(elements) {
		var image;
		for (var a = 0, b = elements.length; a < b; a += 1) {
			// test if the background url exists with image objects
			image = new Image(100,100);
			image.onerror = this.onBackgroundError.bind(this, elements[a]);
			image.src = elements[a].style.backgroundImage.split(/url\("|"\)|url\('|'\)/gi)[1];
		}
	};

	this.onImageError = function (element, evt) {
		// replace the image with a placeholder
		element.src = this.config.url;
	};

	this.onBackgroundError = function (element, evt) {
		// replace the background with a placeholder
		element.style.backgroundImage = 'url("' + this.config.url + '")';
	};

	this.onStartUp = function(evt) {
		// check if any of the images have failed before the script loaded
		var images = document.querySelectorAll(this.config.images);
		for (var a = 0, b = images.length; a < b; a += 1) {
			if (typeof images[a].naturalWidth != "undefined" && images[a].naturalWidth == 0) this.onImageError(images[a]);
		}
		// check all the inline backgrounds at least once
		var backgrounds = document.querySelectorAll(this.config.backgrounds);
		this.checkBackgrounds(backgrounds);
	};

	// EVENTS

	if (!this.config.active) return false;

	new WaitForIt({
		'target': document,
		'selector': this.config.images,
		'handler': this.checkImages.bind(this),
		'repeat': true
	});

	new WaitForIt({
		'target': document,
		'selector': this.config.backgrounds,
		'handler': this.checkBackgrounds.bind(this),
		'repeat': true
	});

	window.addEventListener('load', this.onStartUp.bind(this));

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return ImageFallback });
if (typeof module != 'undefined') module.exports = ImageFallback;
