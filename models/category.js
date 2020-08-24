const mongoose = require('mongoose');
const SubCategory = require('./subCategory');

const categorySchema = new mongoose.Schema({
	categoryName : {
		type : String,
		required : [true,"This field is required!."],
		unique : true
	},
	subCategories:[{
		type : mongoose.Schema.Types.ObjectId,
		ref:"SubCategory"
	}]
})

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;