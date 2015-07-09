var gulp = require('gulp');

var imageminJpegtran = require('imagemin-jpegtran');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');

gulp.task('jpegs', function () {
	return gulp.src('img-src/*.jpg')
		.pipe(imageminJpegtran({})())
		.pipe(gulp.dest('img'));
});

gulp.task('images', ['jpegs']);

gulp.task('minify-html', function () {
	return gulp.src('html-src/*.html')
		.pipe(minifyHTML({conditionals: true}))
		.pipe(minifyInline())
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['images', 'minify-html']);
