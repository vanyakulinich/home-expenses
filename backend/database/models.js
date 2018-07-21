const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// schemas
// single category schema
const CategorySchema = new Schema({ 
    name: String,
    value: Number,
    date: {type: Date, default: new Date().toLocaleDateString()}, // date format will be changed soon
    parentName: String,
})

// user schema, includes category schemas as children
const UserSchema = new Schema({
    email: String,
    pass: String,
    token: String, // before token, email verification key is stored here
    categories: [CategorySchema]
});

// models
const CategoryModel = mongoose.model('Categories', CategorySchema);
const UserModel = mongoose.model('Users', UserSchema);





// const UserModel = mongoose.model('Users', UserSchema);

// // unverified user schema and model
// const UnverifiedUsersSchema = new Schema ({
//     email: String,
//     pass: String,
//     verifyKey: String
// })
// const UnverifiedUsersModel = mongoose.model('VerifyUsers', UnverifiedUsersSchema)



// // single category schema and model
// const SingleCategorySchema = new Schema({
//     name: String,
//     value: Number,
//     date: {type: Date, default: new Date().toLocaleDateString()}, // date format is for change
//     children: Boolean,
//     parent: Boolean,
// })
// const SingleCategoryModel = mongoose.model('Single Categories', SingleCategorySchema)

// const UserDataSchema = new Schema({
//     user: String,
//     categories: [SingleCategorySchema]
// })

// const UserDataModel = mongoose.model('UsersData', UserDataSchema)

// exported models
const models = {
    UserModel,
    CategoryModel,
    // UnverifiedUsersModel,
    // SingleCategoryModel,
    // UserDataModel
}

module.exports = models;