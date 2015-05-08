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
                src: ['js/*.js'],
                dest: 'www/assets/js/app.js'
            },

            // concat all libraries into on file that changes not so often
            // manually select the js files to concat
            lib: {
                // src order matters, requireJS in use atm :)
                src: [
                    // eventually decouple jquery?
                    'bower_components/jquery/dist/jquery.js',

                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-animate/angular-animate.js'
                ],
                dest: 'www/assets/js/lib.js'
            }
        },

        uglify: {
            app: {
                options: {
                    banner: '<%= banner %>'
                },
                src: '<%= concat.app.dest %>',
                dest: 'www/assets/js/app.min.js'
            },
            lib: {
                src: '<%= concat.lib.dest %>',
                dest: 'www/assets/js/lib.min.js'
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
                unused: false, // might want to switch to true
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    angular: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app: {
                src: 'js/*.js'
            }
        },

        less: {
            dev: {
                files: {
                    "www/assets/css/main.css": [
                        "less/main.less"
                    ]
                }
            }
            /*,
            prod: {
                options: {
                    compress: true,
                    cleancss: true,
                    optimization: 3
                },
                files: {
                    "www/assets/css/main.min.css": [
                        "less/main.less"
                    ]
                }
            }
            */
        },

        autoprefixer: {
            options: {
            },
            main: {
                options: {},
                src: 'www/assets/css/main.css',
                dest: 'www/assets/css/main.css'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'www/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'www/assets/css',
                    ext: '.min.css'
                }]
            }
        },

        todo: {
            options: {
                file: "TODO.md",
                githubBoxes: true,
                colophon: true,
                usePackage: true
            },
            src: ['src/*', 'less/*', 'js/*', 'www/*.php', 'www/partials/*']
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: 'bower_components/bower/*',
                tasks: ["concat:lib", "uglify:lib"]
            },
            less: {
                files: 'less/*.less',
                tasks: ["less", "autoprefixer", "cssmin"]
            },
            app: {
                files: 'js/*.js',
                tasks: ['jshint:app', 'concat:app', 'uglify:app']
            },
            todo: {
                files: '<%= todo.src %>',
                tasks: ['todo']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-todo');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task.
    grunt.registerTask('default', ['less', 'jshint', 'concat', 'uglify', 'todo']);
    grunt.registerTask('lib', ['concat:lib', 'uglify:lib']);

};
