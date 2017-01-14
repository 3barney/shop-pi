/*eslint-disable no-console*/

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

/* COMPILE AND COPY APP*/
gulp.task("compile:index", function() {
  return gulp.src(["*.js"])
    .pipe(gulp_babel({presets: ['es2015']}))
    .pipe(gulp.dest("./build"));
});

gulp.task("compile:app", function() {
  return gulp.src(["src/**/*.js"])
    .pipe(gulp_babel({presets: ['es2015']}))
    .pipe(gulp.dest("./build/src"));
});


/** WATCH **/
gulp.task("watch:index", function() {
  gulp.watch('*.js', ["copy:index"]);
});


/**
 * Start local server for development
 */
gulp.task("serve:dev",  function() {
    gulp_livereload.listen();
    gulp_nodemon({
        script: "build/index.js",
        ext: "js",
        ignore: []
    }).on("restart", function() {
        console.log("Nodemon Restarted");
        gulp_livereload.changed();
    });
});


gulp.task("copy:all", ["copy:packagejson", "copy:envFile"]);

gulp.task("watch:all", ["watch:index"]);

gulp.task("compile:all", ["compile:index", "compile:app"]);

gulp.task("development", ["watch:all", "copy:all" , "compile:all", "serve:dev"]);

gulp.task("default", ["development"]);
