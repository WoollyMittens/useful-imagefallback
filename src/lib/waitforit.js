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
