var gulp = require('gulp')
var del = require('del')

var yargs = require('yargs').argv
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');

var dist = __dirname + '/target';

console.log(dist)

gulp.task('clean', function (cb) {
    return del([dist], cb);
});

gulp.task('build:apps', gulp.series('clean'), function(){
    return gulp
        .src([
            './src/**/*.*'
        ], {
            base: './src'
        })
        .pipe(gulp.dest(dist));
});

gulp.task('release', gulp.series('build:apps'));

gulp.task('server',  function () {
    yargs.p = yargs.p || 8086;
    browserSync.init({
        server: {
            baseDir: './src',
            //增加对MOCK的代理服务
            middleware: [
                proxy('/app', {
                    target: yargs.s || 'http://localhost:8080/',
                    changeOrigin: true, // needed for virtual hosted sites
                    pathRewrite: {
                        '^/app': '' // remove base path
                    }
                })
            ]
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        browser: 'chrome',
        startPath: '/'
    });

    gulp.watch([
        './src/**/*.*'
    ]).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('release','server'));
