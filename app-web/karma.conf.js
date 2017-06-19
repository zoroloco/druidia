
//This is our Karma configuration file that sets up our browser testing environment.

/*
Karma allows you to run javascript code within a browser like
Firefox or Chrome.  Or on a headless browser like phantom js.

The file does some main things:

- sets jasmine as the testing framework.
- uses a webpack bundle called test.bundle.js that wraps all our testing and app code.
*/

var path = require('path');
var cwd  = process.cwd();

module.exports = function(config){
  config.set({
    //base path that will be used to resolve all patterns (eg. files, excludes)
    //basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','karma-typescript'],
    // Jasmine is the test development framework.
    files: [
      { pattern: "app/src/base.spec.ts" },
      { pattern: "app/src/**/*.+(ts|html)" }
    ],
    //list of files to exclude
    exclude: [

    ],

    browserConsoleLogOptions: {
        level: 'log',
        format: '%b %T: %m',
        terminal: true
    },

    preprocessors: {
           "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require("karma-typescript-angular2-transform")
                ]
            },
            compilerOptions: {
                lib: ["ES2015", "DOM"]
            }
        },

    reporters: ["progress", "karma-typescript"],

    //test results reporter to use
    //possible values: 'dots', 'progress'
    //available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['spec'],

    //web server port
    port: 9876,

    //enable / disable colors inthe output (reporters and logs)
    colors: true,

    //level of logging
    //possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WAR || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    //enable/disable watching file and executing tests whenever any file changes
    autoWatch: true,

    //start these Browsers
    //available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    //continous integration mode
    //if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
  })
}
