module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'style.css': './scss/style.scss',
                }
            }
        },
        concat: {
            dist: {
                src: ['js/push.js', 'js/parse.js', 'js/init.js', 'js/run.js'],
                dest: 'app.js',
            },
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat'],
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
            }
        },
        browserSync: {
            bsFiles: {
                src: 'style.css'
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['browserSync', 'watch']);

};