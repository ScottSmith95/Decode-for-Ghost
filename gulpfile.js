'use strict';

const gulp       = require('gulp');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
	styles:  {
		src: ['assets/styles/*.css', '!assets/styles/variables.css'],
		dest: 'assets/styles/build/'
	}
};

function styles() {
	var processors = [
		require('postcss-import'),
		require('autoprefixer'),
		require('postcss-nested'),
	    require('postcss-custom-properties'),
	    require('postcss-pseudoelements'),
		require('css-mqpacker')({sort: true}),
		require('postcss-normalize'),
		require('cssnano')({autoprefixer: false})
    ];
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.styles.dest));
}

function watch() {
	gulp.watch(paths.styles.src, styles);
}

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
const defaultTask = gulp.parallel(styles, watch);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
const buildTask = gulp.parallel(styles);

// Exports
// Externalise individual tasks.
exports.styles = styles;
exports.watch = watch;

// Externalise Workflows.
exports.build = buildTask;
exports.default = defaultTask;