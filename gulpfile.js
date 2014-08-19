var gulp       = require('gulp'),
	csscomb    = require('gulp-csscomb'),
	sass       = require('gulp-sass'),
	prefix     = require('gulp-autoprefixer'),
	minify     = require('gulp-minify-css'),
	bower      = require('gulp-bower');
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles:     ['assets/styles/*.scss', 'bower_components/normalize-css/normalize.css'],
	scripts:    ['assets/scripts/main.js', 'bower_components/FitVids/jquery.fitvids.js'],
};

gulp.task('bower', function() {
	return bower()
});

gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
			.pipe(csscomb())
			.pipe(sass())
			.pipe(prefix('last 2 versions', '> 1%', 'ie 9', 'ie 8', 'Firefox ESR', 'Opera 12.1'))
			.pipe(minify({cache: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/styles/build/'));
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(concat('main.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/scripts/build/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.scripts, ['scripts']);
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', ['bower', 'styles', 'scripts', 'watch']);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', ['bower', 'styles', 'scripts']);