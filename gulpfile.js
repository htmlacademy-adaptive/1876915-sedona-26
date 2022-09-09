import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import minify from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import { deleteSync } from 'del';

// Styles
export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Html
const html = () => {
  return gulp.src('source/*.html')
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts
const scripts = () => {
  return gulp.src('source/js/main.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

// Images
const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,jpeg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

const imagesWebp = () => {
  return gulp.src('source/img/**/*.{jpg,jpeg,png}')
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,jpeg,png,webp,avif}')
    .pipe(gulp.dest('build/img'));
}

// SVG
const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/**/*'])
    .pipe(svgo({
      js2svg: {
        pretty: true,
        indent: 4,
      }
    }))
    .pipe(gulp.dest('build/img'));
}

export const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        // $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({ inlineSvg: true, cleanDefs: true, cleanSymbols: true, svgAttrs: { fill: 'currentColor' } }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/sprites'));
}

// Copy rest files for build
const copyFiles = () => {
  return gulp.src([
    'source/fonts/**/*.*',
    'source/*.ico',
    'source/*.webmanifest'
  ], { base: 'source' })
    .pipe(gulp.dest('build'));
}

// Copy rest files for dev
const copyDevFiles = () => {
  copyFiles();
  return gulp.src([
    'source/css/pixel-glass.css',
    'source/js/pixel-glass.js'
  ], { base: 'source' })
    .pipe(gulp.dest('build'));
}

// Clean
const clean = (done) => {
  deleteSync(['build']);
  done();
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.{html,js}').on('change', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
  clean,
  imagesWebp,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    copyFiles
  )
);


// Start dev by default
export default gulp.series(
  clean,
  gulp.parallel(
    copyImages,
    copyDevFiles,
    styles,
    html,
    scripts,
    svg,
    sprite,
    copyFiles
  ),
  gulp.series(
    server,
    watcher
  )
);
