const gulp = require("gulp");
const shell = require('gulp-shell');
const runSequence = require('run-sequence').use(gulp);
const protractor = require("gulp-protractor").protractor;

gulp.task('start', () => {
    return gulp.src([])
        .pipe(protractor({
            configFile: "./conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', (err) => {
            throw err;
        });
});

gulp.task('server', (done) => {
    gulp.src('*.js', {read: false})
        .pipe(shell([
            "node_modules\\.bin\\webdriver-manager start"
        ]));
    setTimeout(() => {
        done();
    }, 4000);
});

gulp.task('eslint', () => {
    return gulp.src('*.js', {read: false})
        .pipe(shell([
            'eslint ./ --fix'
        ]));
});

gulp.task('default', () => {
    runSequence('server', 'start');
});