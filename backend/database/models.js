const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// schemas

// single category schema
const CategorySchema = new Schema({ 
    name: String,
    value: Number,
    date: Date, // date format will be changed soon
    parent: String,
    isChild: Boolean,
    children: Number,
    prev: String,
    next: String
})

const ExpensesSchema = new Schema({
    category: String,
    value: Number,
    description: String,
    date: String,
    creationDate: Number


})

const CategoriesListSchema = new Schema({
    name: String,
    id: String,
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
    categoriesList: [CategoriesListSchema],
});

// models
const ExpensesModel = mongoose.model('Expenses', ExpensesSchema);
const CategoryModel = mongoose.model('Categories', CategorySchema);
const ListOfCatsModel = mongoose.model('ListofCats', CategoriesListSchema);
const UserModel = mongoose.model('Users', UserSchema);


// exported models
const models = {
    UserModel,
    CategoryModel,
    ExpensesModel,
    ListOfCatsModel
}

module.exports = models;