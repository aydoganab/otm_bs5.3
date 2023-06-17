let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let autoprefixer = require('gulp-autoprefixer');
let csso = require('gulp-csso');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let browserSync = require('browser-sync').create();

//SASS
gulp.task('sass', function () {
    return gulp.src('./scss/input.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 2 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 60", "iOS >= 12", "Safari >= 12", "Android >= 8", "not Explorer <= 11"]}))
        .pipe(rename('otm_bs53.css'))
        .pipe(gulp.dest('app/assets'))
        .pipe(csso({comments:false}))
        .pipe(rename('otm_bs52.min.css'))
        .pipe(gulp.dest('app/assets'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//JS
gulp.task('js', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/@popperjs/core/dist/umd/popper.js', 'node_modules/bootstrap/dist/js/bootstrap.js'])
        .pipe(concat('otm_bs53.js'))
        .pipe(gulp.dest("app/assets"))
        .pipe(uglify())
        //.pipe(rename('otm_bs53.min.js'))
        .pipe(gulp.dest("app/assets"))
        //.pipe(browserSync.reload({
        //    stream: true
        //}))
});

//FA
gulp.task('fa', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/!(*brands*)')
        .pipe(gulp.dest("app/fonts"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//move assets
gulp.task('move_css', function () {
    return gulp.src('app/assets/*.css')
        .pipe(gulp.dest('../otmnew/o/css'))
});

gulp.task('move_js', function () {
    return gulp.src('app/assets/*.min.js')
        .pipe(gulp.dest('../otmnew/o/js'))
});

gulp.task('move_fonts', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/!(*brands*)')
        .pipe(gulp.dest('../otmnew/o/fonts'))
});

gulp.task('move-assets', gulp.series('move_css','move_js','move_fonts'));

//BrowserSync
gulp.task('bSync', function () {
    browserSync.init({
        server: {
            baseDir: ['./app'],
            index: 'index.html',
            watchEvents: ["add", "change", 'unlink']
        }
    });
});

//Watch
gulp.task('watch', function () {
    gulp.watch('./scss/*.scss', gulp.series('sass'));
    gulp.watch("./app/*.html").on("change", browserSync.reload);
    gulp.watch("./app/assets/*.*").on("change", browserSync.reload);
});

//DEFAULT
gulp.task('default', gulp.series('sass', 'js', 'fa', gulp.parallel('bSync', 'watch')));