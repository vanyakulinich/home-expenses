const mongoose = require('./dbConnect');

const Schema = mongoose.Schema;

// schemas
const SubCategorySchema = new Schema({ 
    name: String,
    value: Number,
    date: {type: Date, default: new Date().toLocaleDateString()}, // date format will be changed soon
    parentName: String,
})



// single category schema
const CategorySchema = new Schema({ 
    name: String,
    value: Number,
    date: {type: Date, default: new Date().toLocaleDateString()}, // date format will be changed soon
    parentName: String,
    children: [SubCategorySchema],
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
const SubCategoryModel = mongoose.model('Subcategory', SubCategorySchema)
const CategoryModel = mongoose.model('Categories', CategorySchema);
const UserModel = mongoose.model('Users', UserSchema);


// exported models
const models = {
    UserModel,
    CategoryModel,
    SubCategoryModel
}

module.exports = models;