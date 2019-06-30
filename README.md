# Decode for Ghost

#### [Download the latest release for Ghost here.](https://github.com/ScottSmith95/Decode-for-Ghost/releases/download/0.9.3/decode.zip)

#### [Demo](https://decode-ghost-demo.scotthsmith.com)

A minimal, modern theme, designed to be mobile first and very responsive, Decode is built just for Ghost and uses Ghost's innovative features to present a beautiful and clean blog.

Please open an issue here on GitHub if you have any suggestions or problems with the theme.

Copyright (c) 2013-2019 Scott Smith - Released under The MIT License.

### Compiling Theme (For development)

1. Change into the root directory of the theme

   `cd /path/to/ghost/content/themes/decode/`

2. Install dependencies for npm

   `npm ci || npm install`

3. Run Gulp

   `gulp build`

4. Restart Ghost
   (Only needed if ghost is running in production.)

   `ghost restart`

### Compiling Theme (For deployment)

There is a gulp task to create a zip file that can be uploaded to Ghost's admin.

1. Change into the root directory of the theme

   `cd /path/to/ghost/content/themes/decode/`

2. Install dependencies for npm

   `npm ci || npm install`

3. Run Gulp

   `gulp bundle`

4. In your Ghost Design admin page, upload the file found in /path/to/ghost/content/themes/decode/distribution

### Additional Notes

Syntax highlighting is not supported by Decode, but you can easily inject [prism](http://prismjs.com/), or [highlightjs](https://highlightjs.org/) using the code injection tab.
