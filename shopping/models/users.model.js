var mongoose = require('mongoose');
var bcryptJs = require('bcryptjs');
var schema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true}
});
schema.methods.encryptPassword = function(password) {
    return bcryptJs.hashSync(password, bcryptJs.genSaltSync(5), null);
};
schema.methods.validPassword = function(password) {
    return bcryptJs.compareSync(password, this.password);
};

var User = mongoose.model('User', schema, 'users');
module.exports = User;