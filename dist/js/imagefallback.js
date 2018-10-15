/*
	Source:
	van Creij, Maurice (2018). "waitforit.js: Waits for an element to start existing", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var WaitForIt = function(cfg) {

	// PROPERTIES

	this.target = cfg.target || document;
	this.target = (typeof this.target === 'string') ? document.querySelector(this.target) : this.target;
	this.selector = cfg.selector;
	this.handler = cfg.handler || function() {};
	this.repeat = cfg.repeat || false;

	// METHODS

	this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || function() {
		// create a dummy observer is a native one doesn't exist
		this.observe = function() {
			this.interval = setInterval(this.promise.bind(this, null, this), 500);
		};
		this.disconnect = function() {
			clearInterval(this.interval);
		};
		this.promise = arguments[0];
	};

	this.onMutation = function(mutations, observer) {
		var selection = [];
		var complete = true;
		// if the selector an array
		if (this.selector.constructor === Array) {
			// check all the conditions
			for (var a = 0, b = this.selector.length; a < b; a += 1) {
				selection[a] = document.querySelectorAll(this.selector[a]);
				complete = complete && (selection[a].length > 0);
			}
		} else {
			// or check the only condition
			selection = document.querySelectorAll(this.selector);
			complete = (selection.length > 0);
		}
		// check if the element(s) exists yet
		if (complete) {
			// stop observing
			if (!this.repeat) {
				observer.disconnect();
			}
			// resolve the promise
			this.handler(selection);
		};
	};

	// EVENTS

	if (this.target) {

		this.observer = new MutationObserver(this.onMutation.bind(this));

		this.observer.observe(this.target, {
			'childList': true,
			'attributes': true,
			'attributeFilter': [
				'id', 'class'
			],
			'characterData': false,
			'subtree': true,
			'attributeOldValue': false,
			'characterDataOldValue': false
		});

	}
};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = WaitForIt;
}

/*
	Source:
	van Creij, Maurice (2018). "imagefallback.js: Replace missing images", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var ImageFallback = function (config) {

	// PROPERTIES

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

};

// catch (de)activation

if (/imagefallback=on/i.test(document.location.href)) {
	localStorage.setItem('ImageFallback', 'on');
}

if (/imagefallback=off/i.test(document.location.href)) {
	localStorage.setItem('ImageFallback', 'off');
}

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = ImageFallback;
}
