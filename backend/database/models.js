const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// schemas

// single category schema
const CategorySchema = new Schema({ 
    name: String,
    value: Number,
    date: {type: Date, default: new Date().toLocaleDateString()}, // date format will be changed soon
    parent: String,
    isChild: Boolean,
    prev: String,
    next: String
})

const ExpensesSchema = new Schema({
    category: String,
    name: String,
    value: Number,


})

// user schema, includes category schemas as children
const UserSchema = new Schema({
    userId: Number, // this can be usefull if the app will expand and admin user appears
    email: String,
    pass: String,
    verified: Boolean,
    verifyKey: Number,
    categories: [CategorySchema]
});

// models
const ExpensesModel = mongoose.model('Expenses', ExpensesSchema);
const CategoryModel = mongoose.model('Categories', CategorySchema);
const UserModel = mongoose.model('Users', UserSchema);


// exported models
const models = {
    UserModel,
    CategoryModel,
    ExpensesModel
}

module.exports = models;