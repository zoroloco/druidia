//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    errorController    = require(pathUtil.join(__dirname,'../controllers/error.server.controller.js')),
    apiController      = require(pathUtil.join(__dirname,'../controllers/api.server.controller.js')),
    passport           = require('passport');

module.exports = function(app) {
    //order important here.
    app.use(securityController.auditRequest,
            securityController.reRouteHttps);

    var serveIndex = function(req,res){
        log.info("Sending index to client.");
        res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
    };

    app.get('/',serveIndex);
    app.get('/login',serveIndex);
    app.get('/register',serveIndex);
    app.get('/home',serveIndex);

    //only used for facebook authentication that was originally triggered by a get request.
    //  /authenticated?jwtToken=FDSJFLKSDJFL...
    app.get('/authenticated',function(req,res){
        log.info("Authenticated route hit with JWT = "+req.query.jwtToken);
        res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
    });

    app.post('/auth/createAccount',
        securityController.processCreateAccount);

    //route for normal un/pw authentication.
    app.post('/auth/login',
        passport.authenticate('local'),
        securityController.processSuccessfulLocalLoginCallback);

    //route for facebook authentication.
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.  This route is defined on the facebook website under your app's settings.
    app.get('/auth/facebook/callback',
        securityController.processSuccessfulFacebookCallback);

    //any GET to the API will have to be routed through the jwtCheck!
    app.get('/api/*',
        securityController.jwtCheck);

    //any POST to the API will have to be routed through the jwtCheck!
    app.post('/api/*',
        securityController.jwtCheck);

    //fetch all users in application.
    app.get('./api/fetchUsers',
        apiController.fetchUsers);

    //route to get logged in user's profile.
    app.get('/api/fetchUser',
        apiController.fetchUser);

    app.get('/api/fetchMovies',
        securityController.reRouteHttps,
        apiController.fetchMovies);

    //error middleware triggered by next('some error');
    //error handling middleware is always declared last.
    app.use(errorController.handleError);
};
