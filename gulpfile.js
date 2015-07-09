var gulp = require('gulp');

var rename = require('gulp-rename');
var imageminJpegtran = require('imagemin-jpegtran');
var inlineSource = require('gulp-inline-source');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');

gulp.task('jpegs', function () {
	return gulp.src('img-src/*.jpg')
		.pipe(imageminJpegtran({})())
		.pipe(gulp.dest('img'));
});

gulp.task('images', ['jpegs']);

gulp.task('minify-html', function () {
	return gulp.src('./*.src.html')
		.pipe(inlineSource())
		.pipe(minifyHTML({conditionals: true}))
		.pipe(minifyInline())
		.pipe(rename(function(path) {
			path.basename = path.basename.replace('.src', '');
			//return path;
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['images', 'minify-html']);
