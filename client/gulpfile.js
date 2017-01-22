const gulp = require('gulp');
const compass = require('gulp-compass');
const minifyCSS = require('gulp-minify-css');
const webpack = require('webpack-stream');

const path = require('path');
const SRC = path.resolve(__dirname, 'src');
const PUBLIC = path.resolve(__dirname, 'public');
const paths = {
	sass_dir: path.join(SRC, 'sass'),
	css_dir: path.join(PUBLIC),
	scripts: path.join(SRC, '/**/*.js'),
	styles: path.join(SRC, '/**/*.scss')
};

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
	return gulp.src(path.join(SRC, 'sass', 'style.scss'))
		.pipe(compass({
			css: paths.css_dir,
			sass: paths.sass_dir,
			require: ['susy', 'normalize-scss']
		}))
		.on('error', function(error) {
			// Would like to catch the error here 
			console.log(error);
			this.emit('end');
		})
		.pipe(minifyCSS())
		.pipe(gulp.dest(PUBLIC));
});

// Watch All styles and scripts
gulp.task('watch', function() {
	gulp.watch(paths.styles, ['css']);
	gulp.watch(paths.scripts, ['js']);
});


gulp.task('default', ['js', 'css']);