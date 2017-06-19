#Description
This github repo has 3 projects.

app-server = A node express JS server.
app-web    = An angular 2 front-end application.
app-ios    = An Ionic 2 application that calls app-server via REST.

#Environment Setup

Install MongoDB for Centos 7.

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/

sudo npm install -g bower
npm install -g typescript
sudo npm install -g ionic
npm install -g cordova
npm install -g ios-sim
npm install passport-facebook
npm install --save-dev typescript gulp gulp-typescript
npm install --save-dev browserify tsify vinyl-source-stream
npm install --save-dev watchify gulp-util
npm install --save-dev gulp-uglify vinyl-buffer gulp-sourcemaps
npm install --save-dev run-sequence
npm install -g uglify
npm install -g minify
npm install -g uglifyjs
npm install -g browserify
npm install auth0-js
npm install rimraf -g
npm install copyfiles -g ( please see Note below )
npm install angular2-froala-wysiwyg --save
npm install --save-dev @types/jasmine
npm install karma --save-dev
npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
npm install jasmine-core --save-dev
npm install -g karma-cli
npm install --save-dev webpack
npm install --save-dev karma-webpack
npm install awesome-typescript-loader --save-dev
npm install angular2-template-loader --save-dev
npm install ts-loader
npm install karma-jasmine --save-dev
npm install --save-dev karma-typescript
npm install --save-dev karma-typescript-angular2-transform

ionic platform add ios

#Install libraries
bower install (installs front-end static files)
npm install (installs all front and back-end dependencies)

#NPM scripts for app-server
npm start (starts express js server)

#Useful NPM Build scripts for the Angular project.
npm run html      - copies all the html files to the dist folder, including the www folder.
npm run resources - copies the resources folder to the dist folder.
npm run build     - runs html and resources scripts, but also compiles the ts and moves js output to dist folder.
npm run deploy    - runs build, but also minifies the bundle.js to a bundle.min.js ready for production.

#Sources:
https://github.com/froala/angular2-froala-wysiwyg
http://zavoloklom.github.io/material-design-iconic-font/icons.html#application

#Note:
The NPM command:  npm run html, which copies all the html files to the dist/html folder works for Linux/MAC.  For windows, please add the quotes
around app/src/**/*.html for it to work.  
