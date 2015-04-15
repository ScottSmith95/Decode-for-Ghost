var gulp       = require('gulp'),
	csscomb    = require('gulp-csscomb'),
	sass       = require('gulp-sass'),
	postcss    = require('gulp-postcss'),
	bower      = require('gulp-bower');
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles:  ['assets/styles/*.scss'],
	scripts: ['assets/scripts/main.js', 'bower_components/FitVids/jquery.fitvids.js'],
};

gulp.task('styles', function() {
	var processors = [
		require('autoprefixer-core')('last 2 versions', '> 1%', 'ie 9', 'ie 8', 'Firefox ESR'),
		require('css-mqpacker'),
		require('postcss-import')({path: ['node_modules']}), // Look in the node_modules folder for @imports (Normalize.css).
		require('csswring')
    ];
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
			.pipe(csscomb())
			.pipe(sass())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/styles/build/'));
});

gulp.task('scripts', function() {
	bower();
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
gulp.task('default', ['styles', 'scripts', 'watch']);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', ['styles', 'scripts']);