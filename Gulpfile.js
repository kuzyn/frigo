var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://localhost:3000/api/docs',
    port: 4000,
    browser: ['chromium-browser']
  });
});

gulp.task('js',  function () {
  return gulp.src('./public/**/*.js')
    // do stuff to JavaScript files
    .pipe(browserSync.reload());
});

gulp.task('css', function () {
  return gulp.src('./public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', function() {
  gulp.src('./public/stylesheets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concatCss('style.css'))
  .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('bs-reload-delay', function () {
  setTimeout(function () {
    browserSync.reload({ stream: false });
  }, 800);
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('./public/**/*.js',   ['js']);
  gulp.watch('./public/**/*.scss',  ['sass', 'css']);
  gulp.watch('./views/**/*.jade', ['bs-reload']);
  gulp.watch(['./routes/**/*.js', './bin/www', './app.js'], ['bs-reload-delay']);
});
