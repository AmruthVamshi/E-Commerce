const CategoryModel = require('../models/category');
const persistance = require('../persistance/category');

//category routes

exports.getCategories = async (req,res) => {
	try {
		let result = await persistance.getCategories(CategoryModel);
		console.log(result)
		res.status(200).json({
			text:'all categories!',
			body:result.map(item=>{return{
				id:item._id,
				categoryName:item.categoryName,
				subCategories:item.subCategories.map(subcat=>{return{subCategoryName:subcat.subCategoryName}})
			}})
		});	
	}catch(err) {
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}	
}

exports.createCategory = async (req,res) => {
	try{
		let result = await persistance.createCategory(CategoryModel,req.body);
		res.status(200).json({
			text : 'created a category!',
			body : result
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}

exports.updateCategory = async (req,res) => {
	try{
		let result = await persistance.updateCategory(CategoryModel,req.params.categoryName,req.body);
		res.status(200).json({
			text:`updated ${result.categoryName}`,
			body:result
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}

exports.deleteCategory = async (req,res) => {
	try{
		let result = await persistance.deleteCategory(CategoryModel,req.params.categoryName);
		res.status(200).json({
			text:`deleted ${result.categoryName}`,
			body:result
		})
	}catch(err){
		console.log(err);
		res.json({
			text:"error",
			err,
		})
	}
}
