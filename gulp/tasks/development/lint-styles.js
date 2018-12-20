var config      = require('../../config').lintStyles;

var gulp        = require('gulp');
var stylelint   = require('gulp-stylelint');

// Lint styles
// Executed in watch.js
gulp.task('lint-styles', function() {
  return gulp.src(config.src)
    .pipe(stylelint(config.options.stylelint));
});
