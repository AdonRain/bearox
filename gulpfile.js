var del = require('del');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var browserify = require('gulp-browserify');
var autoprefixer = require('autoprefixer');

var paths = {
    watch:'./webapp/static/**',
    clean: './webapp/build/**/*.*',
    css: {
        src: './webapp/static/css/*.css',
        dist: './webapp/build/css'
    },
    js: {
        src: './webapp/static/js/*.js',
        dist: './webapp/build/js'
    }
};

gulp.task('clean', function(cb) {
    return del(paths.clean, cb);
});

gulp.task('css', ['clean'], function() {
    var processors = [
        require("postcss-import"),
        require('postcss-nested'),
        require('cssnext'),
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];
    return gulp.src(paths.css.src)
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.css.dist));
});

gulp.task('js', ['css'], function() {
    gulp.src(paths.js.src)
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest(paths.js.dist))
});

gulp.task('watch', function() {
    return gulp.watch(paths.watch, ['js']);
});
