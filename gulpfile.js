var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    prettyHtml = require('gulp-pretty-html');


var path = {
        build: {
            html: './dist/',
            js: './dist/js/',
            css: './dist/css/',
            images: './dist/images/'
        },
        src: {
            pug: './src/templates/pages/*.pug',
            js: './src/js/*.js',
            css: './src/scss/main.scss',
            images: './src/images/*'
        },
        watch: {
            pug: './src/templates/**/*.pug',
            js: './src/js/*.js',
            css: './src/scss/**/*.scss',
            images: './src/images/*'
        },
        clean: './dist'
    },
    name = {
        css: 'main.min.css',
        js: 'main.min.js'
    };

// js
gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(concat(name.js))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
});

// css
gulp.task('sass', function () {
    return gulp.src(path.src.css)
        .pipe(sass())
        .pipe(rename(name.css))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css));
});

// pug
gulp.task('pug', function () {
    return gulp.src(path.src.pug)
        .pipe(pug())
        .pipe(prettyHtml())
        .pipe(gulp.dest(path.build.html));
});

// images
gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.images));
});

// webserver
gulp.task('webserver', function () {
    return gulp.src(path.build.html)
        .pipe(webserver({
            port: 8000,
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: path.build.html + '/index.html'
        }));
});

// default
gulp.task('watch', function () {
    gulp.watch(path.watch.js, gulp.series('js'));
    gulp.watch(path.watch.css, gulp.series('sass'));
    gulp.watch(path.watch.pug, gulp.series('pug'));
    gulp.watch(path.watch.images, gulp.series('images'));
    return
});

gulp.task('default', gulp.series('js', 'sass', 'pug', 'images','webserver', 'watch'));