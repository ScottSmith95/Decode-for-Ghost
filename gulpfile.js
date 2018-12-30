'use strict';

const gulp = require( 'gulp' );
const postcss = require( 'gulp-postcss' );
const sourcemaps = require( 'gulp-sourcemaps' );
const zip = require( 'gulp-zip' );

const paths = {
  styles: {
    src: [ 'assets/styles/*.css', '!assets/styles/variables.css' ],
    dest: 'assets/styles/build/',
    watch: [ 'assets/styles/**/*.css', '!assets/styles/build/**' ]
  }
};

function styles() {
  const processors = [
    require( 'postcss-import' ),
    require( 'postcss-nested' ),
    require( 'postcss-custom-properties' ),
    require( 'postcss-normalize' )( { forceImport: true } ),
    require( 'css-mqpacker' )( { sort: true } ),
    require( 'autoprefixer' ),
    require( 'cssnano' )( {
      preset: [
        'default',
        {
          calc: false,
          mergeLonghand: false // These conflict with processing nested calc() and env values().
        }
      ]
    } )
  ];
  return gulp
    .src( paths.styles.src )
    .pipe( sourcemaps.init() )
    .pipe( postcss( processors ) )
    .pipe( sourcemaps.write( './' ) )
    .pipe( gulp.dest( paths.styles.dest ) );
}

function watch() {
  gulp.watch( paths.styles.watch, styles );
}

function bundle() {
  return gulp
    .src(
      [
        './*',
        './assets/**',
        './locales/**',
        './partials/**',
        '!./node_modules',
        '!./distribution'
      ],
      { base: '.' }
    )
    .pipe( zip( 'decode.zip' ) )
    .pipe( gulp.dest( './distribution' ) );
}

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
const defaultTask = gulp.parallel( styles, watch, bundle );

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
const buildTask = gulp.parallel( styles );

// $ gulp bundle: Bundles current output into a ZIP for each theme install.
const bundleTask = gulp.parallel( bundle );

// Exports
// Externalise individual tasks.
exports.styles = styles;
exports.watch = watch;

// Externalise Workflows.
exports.build = buildTask;
exports.default = defaultTask;
exports.bundle = bundleTask;
