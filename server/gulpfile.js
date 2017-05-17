var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var exec = require('child_process').exec;

gulp.task("default", function () {
    return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest("./build"));
});