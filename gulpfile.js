var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');

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
        style: 'expanded'
    })
    .pipe(plumber())
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

// Image task
// Compress
gulp.task('image', function(){
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img'));
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
