module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		lab : {
			color       : true,
			coverage    : true,
			minCoverage : 100
		},

		watch: {
			scripts: {
				files: ['*/*.js'],
				tasks: ['lab'],
				options: {
					spawn: false,
				},
			},
		},

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-lab');

	// Default task(s).
	grunt.registerTask('default', ['lab']);
	grunt.registerTask('watch', ['nodemon', 'lab']);

};