var mongoose  = require('mongoose'),
    bcrypt    = require('bcryptjs'),
    pathUtil  = require('path'),
    log       = require(pathUtil.join(__dirname,'../lib/logger.js')),
    SALT_WORK_FACTOR = 10;

    var UserSchema = new mongoose.Schema({
      "username"    : {type: String, required: true, index: {unique: true} },
      "password"    : {type: String, required: true},
      "firstname"   : String,
      "lastname"    : String,
      "email"       : String,
      "role"        : {type: String, required: true},
      "description" : String,
      "searchId"    : String,
      "pictureUrl"  : String,
      "lastLoginDate" : Date
    });

    //http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
    //mongoose middleware that will automatically hash the password before it is saved to the db.
    UserSchema.pre('save', function(next){
      var user = this;
      // only hash the password if it has been modified (or is new)
      if (!user.isModified('password')) return next();

      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          // hash the password along with our new salt
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);

              // override the cleartext password with the hashed one
              user.password = hash;
              log.info("Password has been hashed.");
              next();
          });
      });
    });

    //now add the mongoose middleware defining our method that implements
    //password verification.
    UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
      log.info("VERIFYING PASSWORDS");
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if (err){
            cb(err);
          }
          else{
            log.info("Result of password verification:"+isMatch);
            cb(null, isMatch);  
          }
      });
    };

module.exports = mongoose.model('Users', UserSchema);
