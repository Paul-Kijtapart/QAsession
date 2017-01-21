const gulp = require('gulp');
const compass = require('gulp-compass');
const minifyCSS = require('gulp-minify-css');
const webpack = require('webpack-stream');

const path = require('path');
const SRC = path.resolve(__dirname, 'src');
const PUBLIC = path.resolve(__dirname, 'public');

// Scripts
gulp.task('js', function() {
	return gulp.src(SRC + '/index.js')
		.pipe(webpack({
			module: {
				loaders: [{
					test: /\.jsx?/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react']
					}
				}]
			},
			output: {
				filename: 'index.js'
			}
		}))
		.pipe(gulp.dest(PUBLIC));
});

// Styles
gulp.task('css', function() {
	gulp.src(SRC + '/style.scss')
		.pipe(compass({
			css: PUBLIC,
			sass: SRC,
			image: PUBLIC
		}))
		.on('error', function(error) {
			// Would like to catch the error here 
			console.log(error);
			this.emit('end');
		})
		.pipe(minifyCSS())
		.pipe(gulp.dest(PUBLIC));
});

const paths = {
	scripts: SRC + '/**/*.js',
	styles: SRC + '/**/*.scss'
};

// Watch All styles and scripts
gulp.task('watch', function() {
	gulp.watch(paths.styles, ['css']);
	gulp.watch(paths.scripts, ['js']);
});


gulp.task('default', ['js', 'css']);