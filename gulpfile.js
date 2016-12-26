var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");

gulp.task('sass', function () {
  gulp.src('/Applications/MAMP/htdocs/MyBlog/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('/Applications/MAMP/htdocs/MyBlog/css'));
});

gulp.task('default', function(){
    livereload.listen();
    gulp.watch(['/Applications/MAMP/htdocs/MyBlog/js/*.js'], ['js']);
    gulp.watch('/Applications/MAMP/htdocs/MyBlog/sass/**/*.scss', ['sass']);
    gulp.watch(['/Applications/MAMP/htdocs/MyBlog/css/style.css'], function (files){
        livereload.changed(files);
    });
});


gulp.task('js.concat', function() {
  return gulp.src('/Applications/MAMP/htdocs/MyBlog/js/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('/Applications/MAMP/htdocs/MyBlog/js'));
});
gulp.task('js.uglify', function() {
  return gulp.src('/Applications/MAMP/htdocs/MyBlog/js/main.js')
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('/Applications/MAMP/htdocs/MyBlog/js/'));
});


gulp.task('js', ['js.concat', 'js.uglify']);
