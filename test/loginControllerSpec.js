// A test suite in Jasmine
describe('Controller: LoginController', function() {

  //instantiate a new version of the module before each test is run.
  beforeEach(module('login-module'));

  var ctrl;

  //instantiate a new instance of the login controller before each test is run.
  beforeEach(function(inject(function($controller) {
    ctrl = $controller('LoginController');
  }));

  afterEach(function() {
    //do nothing after each test for now.
  });

  //test case 1
  it('should submit credentials to server only if validation passes.', function() {

    //expect(foo).toBeTruthy();
  });

});
