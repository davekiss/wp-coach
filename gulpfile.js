'use strict';

var gulp        = require('gulp'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;
 
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        proxy: "vimeography.dev"
    });

    gulp.watch("./lib/backend/assets/scss/**/*.scss", ['sass']);
    gulp.watch(["./lib/backend/assets/css/*.css", "!./lib/backend/assets/css/**/*.min.css"], ['minify-css']);
    //gulp.watch(["./lib/backend/assets/js/**/*.js", "!./lib/backend/assets/js/**/*.min.js"], ['minify-js']);
    gulp.watch(["./lib/backend/assets/js/**/*.js", "!./lib/backend/assets/js/bundle.js"], ['browserify']);
    gulp.watch(["./**/*.mustache", "./lib/backend/assets/js/**/*.js", "!./lib/backend/assets/js/**/*.min.js"]).on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./lib/backend/assets/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./lib/backend/assets/css"))
      .pipe(reload({stream: true}));
});

gulp.task('minify-css', function() {
  return gulp.src(["./lib/backend/assets/css/*.css", "!./lib/backend/assets/css/*.min.css"])
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./lib/backend/assets/css/'))
});

gulp.task('minify-js', function() {
  return gulp.src('./lib/backend/assets/js/vimeography.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./lib/backend/assets/js/'));
});

gulp.task('browserify', function() {
  return browserify('./lib/backend/assets/js/app.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./lib/backend/assets/js/'));
});

gulp.task('default', ['serve']);