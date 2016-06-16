var userSchema = mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User',userSchema);

module.exports = User;
