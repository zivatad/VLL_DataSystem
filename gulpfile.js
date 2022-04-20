/* jshint node: true */
'use strict';

// Load plugins
const gulp = require('gulp');
const sass = require('gulp-sass'); //scss
const autoprefixer = require('gulp-autoprefixer'); //vendor prefix
const plumber = require("gulp-plumber"); //error handling
const imagemin = require('gulp-imagemin'); //image
const pngquant = require('imagemin-pngquant'); //image
const mozjpeg = require('imagemin-mozjpeg'); //image
const optipng = require('imagemin-optipng'); //image
const cssnano = require("gulp-cssnano"); // css minify
const jsmin = require("gulp-minify"); //js minify
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();

//paths
const paths = {
	//src
    dev: './dev', 
    html : './dev/*.html',
    assets : './dev/assets',
    scss: './dev/assets/scss',
    js : './dev/assets/js/*.js',
    jpg : './dev/assets/img/*.jpg',
    gif : './dev/assets/img/*.gif',
    png : './dev/assets/img/*.png',
    svg : './dev/assets/img/*.svg',
    img : './dev/assets/img/*.{jpg,jpeg,png,gif,svg}',

    //directory for compiled css
    css_dist : './dev/assets/css',

    //master
    master: './master', //top
    assets_mtr: './master/assets', //assets
    css_mtr: './master/assets/css', //css
    img_mtr: './master/assets/img', //img
    js_mtr: './master/assets/js', //js
    lib_mtr: './master/assets/lib' //library

};

//sass compile
gulp.task('sass', function() {
    return gulp
    .src(paths.scss + '/*.scss')
    .on("error", sass.logError)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css_dist))
    .pipe(browserSync.reload({ stream: true }));
});

// reload function
function reload(done) {
  browserSync.reload();
  done();
}

// browser reload and watch
gulp.task('browser-sync', function() {
    browserSync.init({
        browser: "google chrome",
        server: {
             baseDir: paths.dev //targeted directory
        }
    });
    gulp.watch(paths.html, gulp.series(reload));
    gulp.watch(paths.scss + '/*.scss', gulp.series('sass', reload));
    gulp.watch(paths.scss + '/_**/_*.scss').on('change', gulp.series('sass', reload));
    gulp.watch(paths.js, gulp.series(reload));
});

// gulp default
gulp.task('default', gulp.series("browser-sync"));

// Moving files to Public_html

// copy html
gulp.task('html', function() {
    return gulp
    .src(paths.html)
    .pipe(plumber())
    .pipe(gulp.dest(paths.master));
});

// optimize images
gulp.task('imagemin', function() {
    return gulp
    .src(paths.img)
    .pipe(plumber())
    .pipe(imagemin([
      pngquant({
        quality: [.65, .80],  // image quality
        speed: 1,  // minimum speed
        floyd: 0,  // no dithering
      }),
      mozjpeg({
        quality: 85, // image quality
        progressive: true
      }),
      imagemin.svgo(),
      //imagemin.optipng(), //remove for now due to an error
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(paths.img_mtr));
});

// minify css
gulp.task('cssmin', function() {
    return gulp.src(paths.css_dist + '/*.css')
        .pipe(plumber())
        .pipe(cssnano({zindex: false}))
        .pipe(gulp.dest(paths.css_mtr));
});

//minify js
gulp.task('jsmin', function() {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(jsmin({
        ext:{
            src:'.js',
            min:'.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest(paths.js_mtr));
});

// public task
gulp.task('master', gulp.series('html', 'cssmin', 'jsmin', 'imagemin'));
// remove image for now for an error
 





