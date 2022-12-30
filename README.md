# imagefallback.js: Replace missing images.

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

Or import into an MVC framework.

```js
var WaitForIt = require('lib/waitforit.js');
var ImageFallback = require('js/imagefallback.js');
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

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens) and at [WoollyMittens.nl](https://www.woollymittens.nl/).
