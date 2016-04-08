// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    //browsers: ['PhantomJS', 'PhantomJS_custom'],

    port: 8081,

    logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browers['Chrome'];
    // you can define custom flags
    /*
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
    */
  })
}
