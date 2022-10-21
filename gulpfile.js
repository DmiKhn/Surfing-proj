const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH} = require('./gulp.config');

// sass.compiler = require('node-sass');

task(
  'clean', () => {
    console.log(env);
  return src( `${DIST_PATH}/**/*`, { read: false }).pipe( rm() );
});

task( 
  'copy', () => {
  return src(`${DIST_PATH}/**/*.scss`).pipe(dest(DIST_PATH));
});

task( 
  'copy:html', () => {
  return src(`${DIST_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

task( 
  'styles', () => {
  return src([`${SRC_PATH}/sass/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpif(env === 'dev', 
      autoprefixer({
        cascade: false
      })
    ))
    .pipe(gulpif(env === 'dev', gcmq()))
    .pipe(gulpif(env === 'dev', cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

task('scripts', () => {
  return src([`${SRC_PATH}/scripts/*.js`])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

task ('icons', () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {attrs: '(fill|stroke|style|width|height|data.*)'}
          }
        ]
      })
    )
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: `./${DIST_PATH}`
      },
      open: false
  });
});

task('watch', () => {
  watch('./src/sass/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/images/icons/*.svg', series('icons'));
})



task ('default', 
  series('clean', 
    parallel('copy:html', 'styles', 'scripts', 'icons'), 
    parallel('watch', 'server')
  )
);

task ('build', 
  series('clean', parallel('copy:html', 'styles', 'scripts', 'icons'))
);
