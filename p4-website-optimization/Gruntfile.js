module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			build: ['Grunfile.js', 'src/**/*.js']
		},

		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'dist/js/main.js': 'src/js/main.js',
					'dist/js/perfmatters.js': 'src/js/perfmatters.js'
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n/*\n'
			},
			build: {
				files: {
					'dist/css/style.css': 'src/css/style.css',
					'dist/css/bootstrap-grid.css': 'src/css/bootstrap-grid.css',
					'dist/css/style-pizza.css': 'src/css/style-pizza.css',
					'dist/css/print.css': 'src/css/print.css'
				}
			}
		},
		imagemin: {
			static: {
		      options: {
		        optimizationLevel: 3
		      },
		      files: {
		        'dist/img/cam_be_like.jpg': 'src/img/cam_be_like.jpg',
		        'dist/img/mobilewebdev.jpg': 'src/img/mobilewebdev.jpg',
		        'dist/img/pizzeria-sm.jpg': 'src/img/pizzeria-sm.jpg',
		        'dist/img/pizzeria.jpg': 'src/img/pizzeria.jpg',
		        'dist/img/profilepic.jpg': 'src/img/profilepic.jpg',
		        'dist/img/2048.png': 'src/img/2048.png',
		        'dist/img/pizza.png': 'src/img/pizza.png'
		      }
		    }
		},
		htmlmin: {
		    dist: {
		      options: {
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {
		        'dist/index.html': 'src/index.html',
		        'dist/pizza.html': 'src/pizza.html',
		        'dist/project-2048.html': 'src/project-2048.html',
		        'dist/project-mobile.html': 'src/project-mobile.html',
		        'dist/project-webperf.html': 'src/project-webperf.html',
		      }
		    },
		},
		watch: {
			stylesheets: {
				files: 'src//*.css',
				tasks: ['cssmin']
			},
			scripts: {
				files: 'src/**/*.js',
				tasks: ['jshint', 'uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.registerTask('default', ['jshint', 'cssmin', 'uglify', 'watch', 'imagemin', 'htmlmin']);

};