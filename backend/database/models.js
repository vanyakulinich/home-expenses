const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;


// users schema
const UserSchema = new Schema({
    isToken: Boolean,
    token: String,
    email: String,
    pass: String
});
// user model
const UserModel = mongoose.model('Users', UserSchema);


// unverified user schema
const UnverifiedUsersSchema = new Schema ({
    email: String,
    pass: String,
    verifyKey: String
})

const UnverifiedUsersModel = mongoose.model('VerifyUsers', UnverifiedUsersSchema)



// exported models
const models = {
    UserModel,
    UnverifiedUsersModel
}

module.exports = models;