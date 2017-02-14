var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
  return sass('sass/main.scss')
    .pipe(gulp.dest('css/'))
    .pipe(reload({ stream:true }));
});

// watch files for changes and reload
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
        baseDir: '.'
    }
});

  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {cwd: '.'}, reload);
});