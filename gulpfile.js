const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

var buildSass = function() {
    return gulp.src('src/*.sass')
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 Firefox versions','IE >= 11','Safari >= 8','iOS >= 9', 'last 2 Chrome versions'],
            cascade: true
        }))
        .pipe(gulp.dest('dist'))
}

gulp.task('build-sass', () => {
    return buildSass()
});

gulp.task('watch-files', gulp.parallel(() => {
    gulp.watch('src/*.sass', gulp.parallel('build-sass'))
}))

gulp.task('develop', gulp.parallel('build-sass','watch-files'))