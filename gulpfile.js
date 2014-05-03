var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

var dest = 'dist',
    liveReloadPort = 45127;

gulp.task('styles', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(dest));
});

gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('tables.js'))
        .pipe(gulp.dest(dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

gulp.task('clean', function() {
    return gulp.src([dest], {read: false})
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);

    // Create LiveReload server
    var server = livereload(liveReloadPort);

    // Watch any files in dist/, reload on change
    gulp.watch([dest + '/**', 'examples/**/*.html']).on('change', function(file) {
        server.changed(file.path);
    });
});

gulp.task('server', ['default', 'watch'], function(next) {
    var connect = require('connect'),
        server = connect()
            .use(require('connect-livereload')({ port: liveReloadPort }))
            .use(connect.static('.'));

        server.listen(process.env.PORT || 8080, next);
});