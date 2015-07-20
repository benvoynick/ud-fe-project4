var gulp = require('gulp');

var imageminJpegtran = require('imagemin-jpegtran');
var inlineSource = require('gulp-inline-source');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
 
gulp.task('jpegs', function () {
	return gulp.src('./src/**/*.jpg')
		//.pipe(imageminJpegtran({})())
		.pipe(gulp.dest('./prod/'));
});

gulp.task('images', ['jpegs']);

gulp.task('minify-css', function () {
	return gulp.src('./src/**/*.css')
		.pipe(minifyCss({compatibility: '*'}))
		.pipe(gulp.dest('./prod/'));
});

gulp.task('uglify-js', function() {
  return gulp.src('./src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./prod/'));
});

gulp.task('minify-html', function () {
	return gulp.src('./src/**/*.html')
		.pipe(inlineSource())
		.pipe(minifyHTML({conditionals: true}))
		.pipe(minifyInline())
		.pipe(gulp.dest('./prod/'));
});

gulp.task('minify', ['minify-css', 'uglify-js', 'minify-html']);

gulp.task('default', ['images', 'minify']);
