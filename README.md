# imagefallback.js: Replace missing images.

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

Replace missing (inline) images with a placeholder.

## How to include the script

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/waitforit.js"></script>
<script src="js/imagefallback.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/waitforit.js',
	'js/imagefallback.js'
], function(WaitForIt, ImageFallback) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {WaitForIt = require('lib/waitforit.js";
@import {ImageFallback} from "js/imagefallback.js";
```

## How to start the script

```html
<div style="background-image:url('this_image_is_intentionally_missing.jpg')"></div>
<img alt="" src="this_image_is_intentionally_missing.jpg">
```

```javascript
var imageFallback = new ImageFallback({
	'active': (localStorage.getItem('ImageFallback')=='on'),
	'images': 'img',
	'backgrounds': '[style*="background-image"]',
	'url': './img/fallback.jpg' //'https://picsum.photos/800/600'
});
```

**'active' : {Boolean}** - Optionally only run when a condition is met (e.g. a keyword is present in localstorage).

**'images' : {CSS rule}** - Rule that describes affected images.

**'background' : {CSS rule}** - Rule that describes affected backgrounds.

**'url' : {string}** - Path to a placeholder image or service.

## How to activate the script

Allow or disallow the image fallbacks by adding `?imagefallback=on` or `?imagefallback=off` to the end of your url. This makes it harder for the functionality to be accidentally pushed to a production server.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
