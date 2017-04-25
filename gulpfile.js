var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

// Scripts task
// Uglifies
gulp.task('scripts', function(){
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Style task
// Uglifies
gulp.task('styles', function(){
    sass('scss/**/*.scss', {
        style: 'compressed'
    })
    .pipe(plumber())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

// Watch task
// Watches Js
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch(['css/style.css'], function (files){
        livereload.changed(files);
    });
});

gulp.task('default', ['scripts', 'styles', 'watch']);
