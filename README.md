## Website Performance Optimization portfolio project - Ben Voynick

index.html was optimized for PageSpeed Insight score, and views/js/main.js was optimized for its performance and frame times in views/pizza.html.

The `src` directory holds development files, and the `prod` directory is where the Gulp build process delivers the final production files.

### index.html

index.html now attains a score of 94 on mobile and 93 on desktop.

#### Optimizations for index.html

I added Gulp and a number of npm packages to the project to add a number of automated optimizations via a Gulp build process. (All necessary devDependencies are set in gulpfile.js.)

Gulp will take the files from the `src` directory and put the processed results in the `prod` directory.

**the `prod` directory holds the final product. The `src` directory holds un-minified, un-optimized files and should not be used for PageSpeed Insights.**

PageSpeed Insights score was increased by these means:

* Instead of loading the Open Sans Google font through a <link> tag that blocks rendering, it is loaded through asynchronous javascript. This does cause a Flash Of Unstyled Text, but Open Sans is not going to be horrendously different from fallback sans serif fonts.
* Similarly, Google Analytics now uses [an asynchronous version from Google](https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced).
* media="print" attribute added to the <link> tag for print.css so that the browser knows not to block rendering.
* Render-blocking CSS and JavaScript such as style.css and google-fonts.js is inlined so that the browser does not have to fetch separate files before rendering. Inlining is performed using gulp-inline-source, which inlines code for any tags with the **inline** attribute.
* The entire index.html file is minified, including inline CSS and Javascript, using gulp-minify-html and gulp-minify-inline.
* JPG images from the img-src directory (for holding high quality originals) are optimized with imagemin-jpegtran. The optimized production copies are placed in the img folder.
* The Pizzeria image was far too large for the 100px dimensions it is loaded at in index.html specifically. To optimize index.html without affecting pizza.html, I copied pizzeria.jpg in to the top level img-src directory and resized it to more appropriate dimensions.

### pizza.html and main.js

main.js now attains 60fps in pizza.html in Chrome on my desktop computer, and resizePizzas() now runs in under 5 ms.

Although FPS sometimes spikes under 60 when running Chrome's Timeline tool on my Moto X (first-gen) phone, performance on mobile is also improved from the original repository.

#### Optimizations to main.js
* In the `updatePositions()` function, a calculation was being done using `document.body.scrollTop` inside a for loop that was also modifying layout. This caused layout thrashing and so the function was terribly inefficient. I moved this calculation outside the for loop, so that the function no longer forces synchronous layout.
* In the anonymous function at the bottom of the main.js file - the one added to the 'DOMContentLoaded' event listener - 200 pizzas were being created no matter the context. I changed this function to calculate the number of rows of pizzas the browser can actually display given its viewport height at the time of the function running, and only create that many rows of background sliding pizzas.
* In the changePizzaSizes() function inside resizePizzas(), `newsize` and `dx` were being recalculated inside the for loop, forcing synchronous layout and hurting performance. These variables are now calculated once and then reused within the loop.
* Smaller performance benefits from using `getElementsByClassName` and `getElementById` calls instead of slower `querySelector` and `querySelectorAll` calls, as well as moving calculations outside loops when they only need to be done once.

### Viewing the pages
If you wish to see my Gulp process in operation, you can optionally navigate to the repository and run `npm install` to install dependencies and then `gulp`. (Requires npm, [Node Package Manager](https://nodejs.org/).) However, production files are already included in this repository in the `prod` folder, so this step is not necessary to view the end products and inspect optimizations.

You can load the index.html and pizza.html pages in Chrome or your browser of choice. To test PageSpeed Insights scores, follow the [instructions in the original repository's readme](https://github.com/udacity/frontend-nanodegree-mobile-portfolio) to expose a local web server via ngrok.