var gulp = require('gulp');

var imageminJpegtran = require('imagemin-jpegtran');

gulp.task('jpegs', function () {
	return gulp.src('img-src/*.jpg')
		.pipe(imageminJpegtran({})())
		.pipe(gulp.dest('img'));
});

gulp.task('images', ['jpegs']);

gulp.task('default', ['images']);
