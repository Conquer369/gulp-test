/*
    通过gulp-rev-collector插件实现文件名hash及引用文件名自动替换
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

//  处理图片文件——将图片名hash后放置到目标目录中并生成hash映射文件后放置到目标目录中
gulp.task('img', function() {
    return gulp.src('img/*.jpg')
        .pipe(rev())
        .pipe(gulp.dest('dist/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/img'));
});

//  处理CSS文件——将CSS文件中的引用文件名替换为hash并将CSS本身文件名hash后放置到目标目录中并生成hash映射文件后放置到目标目录中
gulp.task('revCss', function() {
    return gulp.src(['rev/**/*.json', 'css/*.css'])
        .pipe(revCollector({
            replaceReved: true,//允许替换, 已经被替换过的文件
            dirReplacements: {
                'img': 'img',
            }
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

//  处理JS文件——将JS文件名hash后放置到目标目录中并生成hash映射文件后放置到目标目录中
gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

//  处理HTML文件——将HTML文件中的引用文件名替换为hash后放置到目标目录中
gulp.task('revHtml', function() {
    return gulp.src(['rev/**/*.json', './*.html'])
        .pipe(revCollector({
            replaceReved: true,//允许替换, 已经被替换过的文件
            dirReplacements: {
                'css': 'css',
                'js': 'js',
            }
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