const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const del = require("del");
const sync = require("browser-sync").create();

const html = () => {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("build"))
}

exports.html = html;

const script = () => {
  return gulp.src("src/js/main.js")
    .pipe(gulp.dest("build/js"))
}

exports.script = script;

const styles = () => {
  return gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
}

exports.styles = styles;

const copy = (done) => {
  gulp.src([
    "src/fonts/*.{woff,woff2,ttf}",
    "src/*.ico",
    "src/img/**/*.{jpg,png,svg}",
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"))
  done();
}
exports.copy = copy;

const clean = () => {
  return del("build")
}
exports.clean = clean;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build' //сюда смотрит сервер
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const reload = done => {
  sync.reload();
  done();
}

const watcher = () => {
  gulp.watch("src/less/**/*.less", gulp.series(styles, reload));
  gulp.watch("src/js/main.js", gulp.series(script, reload));
  gulp.watch("src/*.html", gulp.series(html, reload));
}

exports.default = gulp.series(
  clean,
  gulp.parallel(
    html,
    script,
    styles,
    copy,
  ),
  gulp.series(
    server,
    watcher
  )
);
