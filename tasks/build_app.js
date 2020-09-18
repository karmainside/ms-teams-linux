const gulp = require('gulp');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const jetpack = require('fs-jetpack');
const bundle = require('./bundle');
const utils = require('./utils');

const projectDir = jetpack;
const srcDir = jetpack.cwd('./src');
const destDir = jetpack.cwd('./app');

gulp.task('bundle', (done) => {
  Promise.all([
    bundle(srcDir.path('background.js'), destDir.path('background.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js')),
  ]);
  done();
});

gulp.task('environment', (done) => {
  const configFile = `config/env_${utils.getEnvName()}.json`;
  projectDir.copy(configFile, destDir.path('env.json'), { overwrite: true });
  done();
});

gulp.task('watch', (done) => {
  const beepOnError = function(done) {
    return function(err) {
      if (err) {
        utils.beepSound();
      }
      done(err);
    };
  };

  watch(
    'src/**/*.js',
    batch((events, done) => {
      gulp.start('bundle', beepOnError(done));
    })
  );
  done();
});

gulp.task('build', gulp.series('bundle', gulp.series( 'environment')));
