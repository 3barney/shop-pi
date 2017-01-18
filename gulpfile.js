/*eslint-disable no-console*/
/*eslint-disable no-var*/

"use strict";

const gulp = require('gulp');
const gulp_livereload = require("gulp-livereload");
const gulp_nodemon = require("gulp-nodemon");
const del = require("del");
const gulp_babel = require("gulp-babel");

// Delete Build folder
gulp.task('clean:build', function() {
  return del(["build/**/*", "build/**"]);
});

/** Copy Files */
gulp.task("copy:packagejson", function () {
    return gulp.src(["package.json"])
        .pipe(gulp.dest("./build"));
});

gulp.task("copy:envFile", function () {
    return gulp.src([".env"])
        .pipe(gulp.dest("./build"));
});

/* COMPILE AND COPY APP
.pipe(gulp_babel({presets: ['es2015']}))
*/
gulp.task("compile:index", function() {
  return gulp.src(["*.js"])
    .pipe(gulp.dest("./build"));
});

gulp.task("compile:app", function() {
  return gulp.src(["src/**/*.js"])
    .pipe(gulp.dest("./build/src"));
});
/*ignore: [
  "/src/features/Users/UserModel.js"
]*/

/** WATCH **/
gulp.task("watch:index", function() {
  gulp.watch('*.js', ["compile:index"]);
});

gulp.task("watch:app", function() {
  gulp.watch('src/**/*.js', ["compile:app"]);
});

gulp.task("serve:dev", function() {
  var stream = gulp_nodemon({ script: "build/index.js"
          , ext: 'js'
          , ignore: [] });

  stream
    .on('restart', function() {
      console.log('restarted!');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10);  // restart the server in 10 seconds
    });
});

gulp.task("copy:all", ["copy:packagejson", "copy:envFile"]);

gulp.task("watch:all", ["watch:index", "watch:app"]);

gulp.task("compile:all", ["compile:index", "compile:app"]);

gulp.task("development", ["copy:all" , "compile:all", "watch:all", "serve:dev"]);

gulp.task("hack", ["copy:all" , "compile:all", "watch:all"]);

gulp.task("default", ["development"]);
