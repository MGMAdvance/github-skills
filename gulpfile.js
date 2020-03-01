var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    plumber     = require('gulp-plumber'),
	jeet        = require('jeet'),
	rupture     = require('rupture'),
	koutoSwiss  = require('kouto-swiss'),
    prefixer    = require('autoprefixer-stylus'),
    cp          = require('child_process');

const src = './src/';

function reactStart(done){
    cp.exec('yarn start');

    done();
}

// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
function stylusCompile(){
    return gulp.src(['./src/styl/main.styl'])
                .pipe(plumber())
                .pipe(stylus({
                    use:[koutoSwiss(), prefixer(), jeet(),rupture()],
                    compress: true
                }))
                .pipe(gulp.dest('./src/assets/css/'));
}

function watchFiles(done){
    gulp.watch(src + 'styl/*.styl', stylusCompile);

    done();
}

// Register the tasks
gulp.task("stylusCompile", stylusCompile);

gulp.task("reactStart", reactStart);

gulp.task("watch", watchFiles);

gulp.task("default", gulp.parallel(reactStart, watchFiles));