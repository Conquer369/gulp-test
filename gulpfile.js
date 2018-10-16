/*
    仅运行清理流程，还原项目原貌
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

//  清理任务
gulp.task('clean', function(){
    return gulp.src(['dist', 'rev'])
        .pipe(clean());
});

//  自动运行默认任务
gulp.task('default', function(cb) {
    runSequence('clean', cb);
});