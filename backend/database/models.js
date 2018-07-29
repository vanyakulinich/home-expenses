const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// schemas
// single category schema
const CategorySchema = new Schema({ 
    name: String,
    parent: String,
    isChild: Boolean,
    children: Number,
})

const ExpensesSchema = new Schema({
    category: String,
    value: Number,
    description: String,
    date: String,
    creationDate: Number,
    catId: String,
    parentId: String,
})

// user schema, includes category schemas as children
const UserSchema = new Schema({
    email: String,
    pass: String,
    verified: Boolean,
    verifyKey: Number,
    categories: [CategorySchema],
    expenses: [ExpensesSchema],
    descriptionBase: [],
});

// models
const ExpensesModel = mongoose.model('Expenses', ExpensesSchema);
const CategoryModel = mongoose.model('Categories', CategorySchema);
const UserModel = mongoose.model('Users', UserSchema);


// exported models
const models = {
    UserModel,
    CategoryModel,
    ExpensesModel,
}

module.exports = models;