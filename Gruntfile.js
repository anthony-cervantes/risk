module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			prod: {
				options: {
					banner: '/*! <%= pkg.name %> */\n'
				},
				files: {
					'public/js/vendor.min.js': [
						'bower_components/jquery/dist/jquery.min.js',
						'bower_components/handlebars/handlebars.min.js',
						'bower_components/ember/ember.prod.js'
					],
					'public/js/app.min.js': [
						'public/js/include/jquery.xdomainajax.js',
						'public/js/include/app.js'
					]
				}
			},
			dev_vendor: {
				options: {
					sourceMap: true
				},
				files: {
					'public/js/vendor.min.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/handlebars/handlebars.js',
						'bower_components/ember/ember.js'
					]
				}
			},
			dev_app: {
				options: {
					sourceMap: true
				},
				files: {
					'public/js/app.min.js': [
						'public/js/include/jquery.xdomainajax.js',
						'public/js/include/app.js'
					]
				}
			}
		},
		less: {
			prod: {
				banner: '/*! <%= pkg.name %> */\n',
				files: {
					'public/css/app.min.css': 'public/less/app.less'
				}
			},
			dev: {
				sourceMap: true,
				files: {
					'public/css/app.min.css': 'public/less/app.less'
				}
			}
		},
		concat: {
			css: {
				src: [
					'public/css/app.min.css',
					'bower_components/semantic-ui/build/packaged/css/semantic.min.css'
				],
				dest: 'public/css/app.min.css'
			}
		},
		watch: {
			js: {
				files: 'public/js/include/*.js',
				tasks: ['uglify:dev_app']
			},
			less: {
				files: 'public/less/*.less',
				tasks: [
					'less:dev',
					'concat:css'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', [/* TODO 'uglify:dev_vendor', */'uglify:dev_app', 'less:dev', 'concat:css']);
	grunt.registerTask('build_prod', ['uglify:prod', 'less:prod', 'concat:css']);
	grunt.registerTask('default', ['build']);
};
