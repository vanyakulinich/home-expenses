const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// users schema and model
const UserSchema = new Schema({
    token: String,
    email: String,
    pass: String,
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
// const UserDataSchema = new Schema({
//     user: String,
//     categories: Object,
// })
// const UserDataModel = mongoose.model('AllUserData', UserDataSchema)




// // single category schema and model
// const SingleCategorySchema = new Schema({
//     user: String,
//     name: String,
//     value: Number,
//     date: {type: Date, default: new Date().toLocaleDateString()}, // date format is for change
//     children: Boolean,
//     parent: Boolean,
// })
// const SingleCategoryModel = mongoose.model('Single Categories', SingleCategorySchema)

// single category schema and model
const SingleCategorySchema = new Schema({
    name: String,
    value: Number,
    date: {type: Date, default: new Date().toLocaleDateString()}, // date format is for change
    children: Boolean,
    parent: Boolean,
})
const SingleCategoryModel = mongoose.model('Single Categories', SingleCategorySchema)

const UserDataSchema = new Schema({
    user: String,
    categories: [SingleCategorySchema]
})

const UserDataModel = mongoose.model('UsersData', UserDataSchema)

// exported models
const models = {
    UserModel,
    UnverifiedUsersModel,
    SingleCategoryModel,
    UserDataModel
}

module.exports = models;