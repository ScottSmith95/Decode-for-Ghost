'use strict';

import { src, dest, watch, series, parallel } from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import minify from 'gulp-terser';

// PostCSS Plugins
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssNormalize from 'postcss-normalize';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


const paths = {
  styles: {
    src: [ 'assets/styles/*.css', '!assets/styles/variables.css' ],
    dest: 'assets/styles/build/',
    watch: [ 'assets/styles/**/*.css', '!assets/styles/build/**' ]
  },
  scripts: {
    src: 'assets/scripts/*.js',
    dest: 'assets/scripts/build/',
    watch: [ 'assets/scripts/**/*.css', '!assets/scripts/build/**' ]
  }
};

function styles() {
  const processors = [
    postcssImport(),
    postcssNested(),
    postcssCustomProperties(),
    postcssNormalize( { forceImport: true } ),
    postcssSortMediaQueries(),
    autoprefixer(),
    cssnano( {
      preset: [
        'default',
        {
          calc: false,
          mergeLonghand: false // These conflict with processing nested calc() and env values().
        }
      ]
    } )
  ];
  return src( paths.styles.src )
    .pipe( sourcemaps.init() )
    .pipe( postcss( processors ) )
    .pipe( sourcemaps.write( './' ) )
    .pipe( dest( paths.styles.dest ) );
}

function scripts() {
	return src( paths.scripts.src )
		.pipe( sourcemaps.init() )
			.pipe( minify() )
		.pipe( sourcemaps.write( './' ) )
		.pipe( dest( paths.scripts.dest ) );
}

function watchTask() {
  watch( paths.styles.watch, styles );
  watch( paths.scripts.src, scripts );
}

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concatenates and minifies JS files; watches for changes. The works.
const defaultTask = parallel( styles, scripts, watch );

// $ gulp build: Builds, prefixes, and minifies CSS files; concatenates and minifies JS files. For deployments.
const buildTask = parallel( styles, scripts );

// Exports
export {
  styles,
  scripts,
  watchTask as watch,
  buildTask as build
};

export default defaultTask;