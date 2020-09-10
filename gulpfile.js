const gulp = require('gulp')
const sass = require('gulp-sass')

var buildSass = function() {
    return gulp.src('src/*.sass')
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist'))
}

gulp.task('build-sass', () => {
    return buildSass()
});

gulp.task('watch-files', gulp.parallel(() => {
    gulp.watch('src/*.sass', gulp.parallel('build-sass'))
}))

gulp.task('develop', gulp.parallel('build-sass','watch-files'))