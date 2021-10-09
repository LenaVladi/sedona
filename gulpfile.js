"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var gulp = require("gulp");
var svgmin = require("gulp-svgmin");
var uglify = require("gulp-uglify");
var htmlmin = require('gulp-htmlmin');
var pump = require("pump");
var sourcemaps = require('gulp-sourcemaps');

gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("build", function (done) {
  run("clean", "copy", "style", "images", "webp", "sprite", "html", "compress", done);
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

var del = require("del");
gulp.task("clean", function () {
  return del("build");
});

gulp.task("default", function () {
  return gulp.src("source/img/sprite.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("source/img/"));
});

gulp.task("compress", function (cb) {
  pump([
    gulp.src("source/js/*.js"),
    uglify()
  ],
    cb
  )
    .pipe(rename(function (path) {
      path.basename += ".min"
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/js/*.js", ["compress"]);
  //gulp.watch("source/*.html").on("change", server.reload);
  gulp.watch("source/*.html", ["html"]);
});


// gulp.task("minhtml", function() {
//   return gulp.src("source/*.html")
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(rename({suffix: ".min"}))
//     .pipe(gulp.dest("build"));
// });

// gulp.task("compress", function () {
//   return gulp.src("source/js/*.js")
//   .pipe(uglify())
//   .pipe(rename({suffix: ".min"}))
//   .pipe(gulp.dest("build/js"));
// });
