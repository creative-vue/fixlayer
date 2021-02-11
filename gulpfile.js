const {series, src, dest, watch} = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('delete');
const sourcemaps = require('gulp-sourcemaps');

function cleanTask() {
    return del(['dist/*.js', 'dist/*.js.map']);
}

function tsTask() {
    return src('src/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts({
        outDir: 'dist',
        target: 'es5',
        removeComments: true,
        esModuleInterop: true,
    }))
    .pipe(sourcemaps.write('.', {
        includeContent: false,
        sourceRoot: '.'
    }))
    .pipe(dest('dist'))
}

function jsTask() {
    return src('dist/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.', {
        includeContent: false,
        sourceRoot: '.'
    }))
    .pipe(dest('dist'))
}

watch(['src/*.ts'], series(cleanTask, tsTask, jsTask));

exports.default = series(cleanTask, tsTask, jsTask);