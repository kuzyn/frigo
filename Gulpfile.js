var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://localhost:3000/api/docs',
    port: 4000,
    browser: ['chromium-browser']
  });
});

gulp.task('js',  function () {
  return gulp.src('server/public/**/*.js')
    // do stuff to JavaScript files
    .pipe(browserSync.reload());
});

gulp.task('css', function () {
  return gulp.src('server/public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', function() {
  gulp.src('server/public/stylesheets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('server/public/stylesheets/'));
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
  gulp.watch('server/public/**/*.js',   ['js']);
  gulp.watch('server/public/**/*.scss',  ['sass']);
  gulp.watch('server/public/**/*.css',  ['css']);
  gulp.watch('server/views/**/*.jade', ['bs-reload']);
  gulp.watch(['server/routes/**/*.js', 'server/bin/www', 'server/server.js'], ['bs-reload-delay']);
});
