# imagefallback.js: Replace missing images.

Replace missing (inline) images with a placeholder.

Try the <a href="http://www.woollymittens.nl/default.php?url=useful-imagefallback">demo</a>.

## How to include the script

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/imagefallback.js"></script>
```

## How to start the script

```html
<div style="background-image:url('this_image_is_intentionally_missing.jpg')"></div>
<img alt="" src="this_image_is_intentionally_missing.jpg">
```

```javascript
var imagefallback = new Imagefallback({
	'elements': document.querySelectorAll('img, [style*="background-image"]'),
	'url': 'https://picsum.photos/800/600'
});
```

**'elements' : {DOM nodes}** - The elements to watch and/or affect.

**'url' : {string}** - Path to a placeholder image.

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

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
