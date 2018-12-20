var config       = require('../../config').styles;

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var browsersync  = require('browser-sync');
var cssGlobbing  = require('gulp-css-globbing');
var sass         = require('gulp-sass');
var notify       = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

function onError(err) {
  console.log(err);
  // Keep gulp from hanging on this task
  this.emit('end');
}

// Compile SCSS
// Build sourcemaps and minimize.
gulp.task('styles', function() {
  browsersync.notify('Compiling SCSS files');

  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(sass({includePaths: ['node_modules']}))
      .on('error', onError)
      .on('error', notify.onError())
    .pipe(autoprefixer({
      'browsers': ['last 2 versions', 'ie 10', 'iOS 8'],
      'supports': false,
    }))
    .pipe(gulp.dest(config.dest));
});
