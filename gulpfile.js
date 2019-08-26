"use strict";

//Load the plugins
const gulp = require( "gulp" );
const sass = require( "gulp-sass" );
const browsersync = require( "browser-sync" ).create();
//Example nothing task
function defaultTask( cb ) {
	// place code for your default task here
	console.log( 'default task' );
	cb();
}


// CSS task
function css() {
	return gulp
		.src( "scss/**/*.scss" )
		.pipe( sass( {
			outputStyle: "expanded"
		} ) )
		.pipe( gulp.dest( "build/assets/css/" ) )
		.pipe( browsersync.stream() );
}

// BrowserSync
function browserSync( done ) {
	browsersync.init( {
		server: {
			baseDir: "./build/"
		},
		port: 3000,
		open: 'local',
	} );
	done();
}

// Watch files
function watchFiles() {
	gulp.watch( "scss/**/*.scss", css );
	gulp.watch( "index.html", html );
}

function html() {
	return gulp
		.src( "index.html" )
		.pipe( gulp.dest( "build/" ) )
		.pipe( browsersync.reload( {
			stream: true
		} ) );
}

//Combo tasks
gulp.task( 'serve',
	gulp.series(
		css, browserSync, watchFiles
	)
);

// Exports
exports.default = defaultTask
exports.css = css
exports.html = html
exports.watch = watchFiles