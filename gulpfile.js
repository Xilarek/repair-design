const {src, dest, watch}         = require('gulp');
const browserSync  = require('browser-sync');
const rename       = require("gulp-rename");
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');

function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    watch("src/*.html").on("change", browserSync.reload);
    watch("src/sass/**/*.sass", serveSass);
    watch("src/js/*.js").on("change", browserSync.reload);
}

function serveSass()  {
    return src('src/sass/*.sass')
      .pipe(sass())
      .pipe(rename({
        prefix: "",
        suffix: ".min"
      }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(dest("src/css"))
      .pipe(autoprefixer({
        cascade: false
        }))
      .pipe(browserSync.stream());
  }
exports.serve = bs;
