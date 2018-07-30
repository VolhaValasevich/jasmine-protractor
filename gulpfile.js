const gulp = require("gulp");
const shell = require('gulp-shell');
const protractor = require("gulp-protractor").protractor;

gulp.task('start', ['server'], () => {
    return gulp.src([])
        .pipe(protractor({
            configFile: "./conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', (err) => {
            throw err;
        });
});

gulp.task('server', ['linter'], (done) => {
    gulp.src('*.js', {read: false})
        .pipe(shell([
            'start cmd /k "node_modules\\.bin\\webdriver-manager start"'
        ]));
    setTimeout(() => {
        done();
    }, 4000);
});


gulp.task('npm_install', () => {
    return gulp.src('*.js', {read: false})
        .pipe(shell([
            'npm install'
        ]));
});

gulp.task('linter', () => {
    return gulp.src('*.js', {read: false})
        .pipe(shell([
            'eslint ./ --fix'
        ]));
});

gulp.task('build', ['npm_install', 'linter'], () => {

});
gulp.task('default', ['start']);