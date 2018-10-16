/*
    通过gulp-asset-rev插件实现文件名hash及引用文件名自动替换
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var assetRev = require('gulp-asset-rev');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

//  处理图片文件——将图片名hash并放置到目标目录中
gulp.task('img', function() {
    return gulp.src('img/*.jpg')
        .pipe(rev())
        .pipe(gulp.dest('dist/img'));
});

//  处理CSS文件——将CSS文件中的引用文件名替换为hash并将CSS本身文件名hash后放置到目标目录中
gulp.task('revCss', function() {
    return gulp.src('css/*.css')
        .pipe(assetRev({
            hashLen: 10,
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'));
});

//  处理JS文件——将JS文件名hash并放置到目标目录中
gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'));
});

//  处理HTML文件——将HTML文件中的引用文件名替换为hash并放置到目标目录中
gulp.task('revHtml', function() {
    return gulp.src('./*.html')
        .pipe(assetRev({
            hashLen: 10,
        }))
        .pipe(gulp.dest('dist'));
});

//  清理任务
gulp.task('clean', function(){
    return gulp.src(['dist', 'rev'])
        .pipe(clean());
});

//  自动运行默认任务
gulp.task('default', function(cb) {
    runSequence('clean', 'img', 'revCss', 'js', 'revHtml', cb);
});