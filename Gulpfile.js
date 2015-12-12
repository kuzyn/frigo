var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['chromium-browser']
  });
});

gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
    // do stuff to JavaScript files
    .pipe(browserSync.reload());
});

gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
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
  gulp.watch('public/**/*.js',   ['js']);
  gulp.watch('public/**/*.css',  ['css']);
  gulp.watch('views/**/*.jade', ['bs-reload']);
  gulp.watch(['routes/**/*.js', 'bin/www', 'app.js'], ['bs-reload-delay']);
});
