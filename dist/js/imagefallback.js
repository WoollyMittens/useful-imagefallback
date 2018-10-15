/*
	Source:
	van Creij, Maurice (2018). "imagefallback.js: Replace missing images", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var ImageFallback = function (config) {

	this.only = function (config) {
		// start an instance of the script
		return new this.Main(config, this);
	};

	this.each = function (config) {
		var _config, _context = this, instances = [];
		// for all element
		for (var a = 0, b = config.elements.length; a < b; a += 1) {
			// clone the configuration
			_config = Object.create(config);
			// insert the current element
			_config.element = config.elements[a];
			// start a new instance of the object
			instances[a] = new this.Main(_config, _context);
		}
		// return the instances
		return instances;
	};

	return (config.elements) ? this.each(config) : this.only(config);

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = ImageFallback;
}

// extend the class
ImageFallback.prototype.Main = function(config, context) {

	// PROPERTIES

	this.config = config;
	this.element = config.element;

	// METHODS

	this.init = function (element) {
		// if the element is an image
		if (element.getAttribute('src')) {
			element.addEventListener('error', this.onImageError.bind(this, element));
		// else if the element has an inline background
		} else if (/background-image:/.test(element.getAttribute('style'))) {
			var image = new Image(100,100);
			image.addEventListener('error', this.onBackgroundError.bind(this, element));
			image.src = element.style.backgroundImage.split(/url\("|"\|url\('|'\)/gi)[1];
		}
	};

	this.onBackgroundError = function (element, evt) {
		// replace the background with a placeholder
		element.style.backgroundImage = 'url("' + this.config.url + '")';
	};

	this.onImageError = function (element, evt) {
		// replace the image with a placeholder
		element.src = this.config.url;
	};

	// EVENTS

	for (var a = 0, b = config.elements.length; a < b; a += 1) {
		this.init(config.elements[a]);
	}

};
