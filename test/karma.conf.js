// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    //browsers: ['PhantomJS', 'PhantomJS_custom'],

    port: 8081,

    // list of files / patterns to load in the browser
    files: [
      '../public/libs/angular/angular.min.js',
      '../public/libs/angular/angular-mocks.js',
      
      '../public/js/controllers/LoginController.js',
      'LoginControllerSpec.js'
    ],

    logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browers['Chrome'],

    // Continuous Integration mode
    // if true, it captures browsers, runs tests, and exits
    singleRun: false
  })
}
