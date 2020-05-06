const {src, dest, watch}         = require('gulp');
const browserSync  = require('browser-sync');
const rename       = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');

function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    watch("./*.html").on("change", browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./js/*.js").on("change", browserSync.reload);
}

function serveSass()  {
    return src('./sass/**/*.sass')
      .pipe(sass())
      .pipe(rename({
        prefix: "",
        suffix: ".min"
      }))
      .pipe(autoprefixer({
        cascade: false
        }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
  }
exports.serve = bs;
