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


// exported models
const models = {
    UserModel,
    CategoryModel,
}

module.exports = models;