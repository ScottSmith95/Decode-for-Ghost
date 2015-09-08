var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles:  ['assets/styles/*.css', '!assets/styles/variables.css']
};

gulp.task('styles', function() {
	var processors = [
		require('postcss-import'),
		require('autoprefixer')('last 2 versions', '> 1%', 'ie 9', 'ie 8', 'Firefox ESR'),
		require('postcss-nested'),
	    require('postcss-custom-properties'),
	    require('postcss-pseudoelements'),
		require('css-mqpacker')({sort: true}),
		require('cssnano')({autoprefixer: false})
    ];
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/styles/build/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.styles, ['styles']);
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', ['styles', 'watch']);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', ['styles']);