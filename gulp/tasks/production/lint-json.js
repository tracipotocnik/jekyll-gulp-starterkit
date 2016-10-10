var gulp      = require('gulp');
var jsonlint  = require('gulp-jsonlint');
var config    = require('../../config').lintJson;

// Lint optimized JSON files
gulp.task('lint-json', function() {
  return gulp.src(config.src)
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});
