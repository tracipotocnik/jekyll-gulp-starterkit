var config    = require('../../config').optimize.css;

var gulp      = require('gulp');
var size      = require('gulp-size');
var minifycss = require('gulp-clean-css');


// Optimize CSS files with UnCSS
gulp.task('optimize:css', function() {
  return gulp.src(config.src)
    .pipe(minifycss)
    .pipe(gulp.dest(config.dest))
    .pipe(size({
      'showFiles': true
    }));
});
