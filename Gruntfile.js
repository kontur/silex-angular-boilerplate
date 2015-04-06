/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },

            app: {
                src: ['app/*.js'],
                dest: 'www/assets/app.js'
            },

            // concat all libraries into on file that changes not so often
            // manually select the js files to concat
            lib: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-animate/angular-animate.js'
                ],
                dest: 'www/assets/lib.js'
            }
        },

        uglify: {
            app: {
                options: {
                    banner: '<%= banner %>'
                },
                src: '<%= concat.app.dest %>',
                dest: 'www/assets/app.min.js'
            },
            lib: {
                src: '<%= concat.lib.dest %>',
                dest: 'www/assets/lib.min.js'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app: {
                src: 'js/*.js'
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },

            app: {
                files: 'js/*.js',
                tasks: ['jshint:app', 'concat:app', 'uglify:app']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['less', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('lib', ['concat:lib', 'uglify:lib']);

};
