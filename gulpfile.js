var gulp                       = require('gulp');
var runSequence                = require('run-sequence');
var conventionalChangelog      = require('gulp-conventional-changelog');
var conventionalGithubReleaser = require('conventional-github-releaser');
var bump                       = require('gulp-bump');
var gutil                      = require('gulp-util');
var git                        = require('gulp-git');
var fs                         = require('fs');
var ts                         = require("gulp-typescript");
var tsProject                  = ts.createProject("app-web/tsconfig.json");
var tsify                      = require("tsify");
var clean                      = require('gulp-clean');
var source                     = require('vinyl-source-stream');
var browserify                 = require("browserify");
var uglify                     = require('gulp-uglify');
var sourcemaps                 = require('gulp-sourcemaps');
var buffer                     = require('vinyl-buffer');
var watchify                   = require("watchify");

var paths = {
    src        : ['app-web/src'],
    dest       : 'app-web/dist',
    www        : 'www',
    entryFiles : ['app-web/src/main.ts'],
    bundleName : 'bundle.js' //an uglified/browserified bundle of the site.
};

//removes all files from the dest folder
gulp.task('clean', function () {
  console.log("Cleaning contents in - "+paths.dest);
  return gulp.src(paths.dest+"/*", {read: false})
    .pipe(clean());
});

//copy html files to dist
gulp.task("copy-html", ['clean'], function () {
  console.log("Copying html files from "+paths.www+"/ to "+paths.dest);
    return gulp.src(paths.www+"/*.html")
        .pipe(gulp.dest(paths.dest+"/wwww"));
});

//compile TS files and copy to dist
gulp.task("tsify", ['copy-html'], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.dest));
});

gulp.task('changelog', function () {
  return gulp.src('CHANGELOG.md', {
    buffer: false
  })
    .pipe(conventionalChangelog({
      preset: 'angular' // Or to any other commit message convention you use.
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('github-release', function(done) {
  conventionalGithubReleaser({
    type: "oauth",
    token: '0a180f41f331c316c65d23e408a499540057aa55' // change this to your own GitHub token or use an environment variable
  }, {
    preset: 'angular' // Or to any other commit message convention you use.
  }, done);
});

gulp.task('bump-version', function () {
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: "patch"}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function (cb) {
  git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function (cb) {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {args: '--tags'}, cb);
  });

  function getPackageJsonVersion () {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
});

gulp.task('release', function (callback) {
  runSequence(
    'bump-version',
    'changelog',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    'github-release',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: paths.entryFiles,
    cache: {},
    packageCache: {}
}).plugin(tsify));

//bundle all files in to a huge bundle.js and move to dest
function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source(paths.bundleName))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest));
}

//the default task run when you gulp
gulp.task("default", ["tsify"], bundle);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
//tasks
//gulp (runs default)
//gulp release (commits code)
//gulp clean
