var gulp = require('gulp');
// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

/*
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
gulp.src(['../html_gulp/new/js/*.*'])

.pipe(uglify())
.pipe(gulp.dest('./new_gulp/new/js/'));
});
*/

var uglify = require('gulp-uglify');
var fs = require('fs')

gulp.task('js', function() {
	var jsSrc =['path_src']
		jsDes ='path_des';
    return gulp.src(jsSrc)
        .pipe(uglify().on('error', function(e)
		{
			fs.appendFile('errorlogfile.txt',jsSrc+'\n',function(err)
			{
				if(err) return console.log('Some error in appending the file'+err);
				console.log('appended');
			});
            console.log(e);
         }))
        .pipe(gulp.dest(jsDes));
});


var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

/**
 
* Don't forget to change Destination file Path
 
*/

gulp.task('css', function() {
	var cssSrc =['path_src']
		cssDes ='path_des';
    gulp.src(cssSrc)
        .pipe(cssmin())
        .pipe(gulp.dest(cssDes));
});
var changed = require('gulp-changed');
// include plug-ins
var minifyHTML = require('gulp-minify-html');


// minify new or changed HTML pages
gulp.task('html', function() {
    var htmlSrc = ['path_src']
        htmlDst = 'path_des';
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        //.pipe(minifyHTML())
		.pipe(minifyHTML({quotes: true}))
        .pipe(gulp.dest(htmlDst));
    console.log("finished");
});


var gulp = require('gulp'),
    util = require('gulp-util'),
    jsonMinify = require('gulp-jsonminify');

gulp.task('json', function() {
    return gulp.src('../guvi_web/new/js/json/gigamon_57.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('../after_gulp/new/js/json/'))
        .on('error', util.log);
});




var gulp = require('gulp');
var changed = require('gulp-changed');
var imgmin = require('gulp-imagemin');
// minify new images

gulp.task('imgmin', function() {
    var imgSrc = '../guvi_web/new/images/payumoney.png',
        imgDst = '../after_gulp/new/images/';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});


var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('js-fef', function() {
    return gulp.src(['file1.js', 'file2.js', 'file3.js'])
        .pipe(gp_concat('concat_test.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gp_rename('uglify_test.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist/js'));
    /*    return gulp.src('../guvi_web/resources/data/guvi-data.js')
    .pipe(uglify())
    .pipe(gulp.dest('../after_gulp/resources/data/'));*/
});



var javascriptobfuscator = require('gulp-javascriptobfuscator');

gulp.task('js-obfus', function() {
    gulp.src('../guvi_web/js/session_details.js')
        .pipe(javascriptobfuscator({
            encodeString: true,
            encodeNumber: true,
            replaceNames: true,
            moveString: true,
            exclusions: ["^_get_", "^_set_", "^_mtd_"]
        }))
        .pipe(gulp.dest('../after_gulp/js/'));
});



var gulp = require('gulp');
var insertLines = require('gulp-insert-lines');

gulp.task('lineinsert', function() {
    gulp.src('../hiw/*.html')
        .pipe(insertLines({
            'before': /<li><a href=#>["']The team["']>\s*$/i,
            'lineBefore': '<script type="text/javascript" src="bundled.min.js"></script>'
        }))
        .pipe(gulp.dest('../hiw1'));
});


var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string');

gulp.task('inject:before', function() {
    gulp.src('../hiw/*.html')
        .pipe(inject.before('<script src="js/namemenu', '<script src="/muruga.js"></script>\n'))
        .pipe(gulp.dest('../hiw1'));
});



var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string');


gulp.task('inject:after', function() {
    gulp.src(['../hiw/*.html'])
        .pipe(inject.after('The Team</a></li>', '\n<li><a href="q2a.html">qa</a></li>\n'))
        //~ .pipe(rename('after.html'))
        .pipe(gulp.dest('../hiw1'));
});


var gulp = require('gulp');
var jslint = require('gulp-jslint');

gulp.task('jslint', function() {
    return gulp.src('test.js')
        .pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
        .pipe(jslint.reporter('default'));
});


var replace = require('gulp-replace');
 
gulp.task('replace', function(){
  gulp.src(['../guvi_web/*.html'])
    .pipe(replace('<span class="top-menu-space"><b><i>How to earn Money</i></b></span>', '<span class="top-menu-space refer_earn">Refer and Earn !</span>'))
    .pipe(gulp.dest('../guvi_web/'));
});




 
var condition = function (file) {
  // TODO: add business logic 
  // console.log(file);
  return true;
}
 
gulp.task('mm', function() {
  gulp.src('../muruga/gulp/index.html')
    .pipe(gulpif(condition, uglify()))
    .pipe(gulp.dest('../muruga/aftergulp/'));
});





