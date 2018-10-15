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
