const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// users schema and model
const UserSchema = new Schema({
    token: String,
    email: String,
    pass: String,
    data: {type: Schema.Types.Array, ref: 'UserDataModel'}
});
const UserModel = mongoose.model('Users', UserSchema);

// unverified user schema and model
const UnverifiedUsersSchema = new Schema ({
    email: String,
    pass: String,
    verifyKey: String
})
const UnverifiedUsersModel = mongoose.model('VerifyUsers', UnverifiedUsersSchema)

// general user data schema
const UserDataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    categories: Array,
})
const UserDataModel = mongoose.model('AllUserData', UserDataSchema)








// exported models
const models = {
    mongoose,
    UserModel,
    UnverifiedUsersModel,
    UserDataModel,
}

module.exports = models;