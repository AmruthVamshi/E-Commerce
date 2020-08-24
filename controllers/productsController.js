//require necessary models
const ProductModel = require('../models/product');
const SubCategoryModel = require('../models/subCategory');
//require persistance layer
const persistance = require('../persistance/product');
const unlinkAsync = require('util').promisify(require('fs').unlink);

//product routes

exports.getProducts = async (req,res) => {
	try {
		let result = await persistance.getProducts(ProductModel,SubCategoryModel,req.params.subCategoryName);
		res.status(200).json({
			text: result.length?`all Products of ${result[0].subCategory.subCategoryName}!.`:'no products exist for this subcategory!.',
			body:result.map(item=>{return{
				id:item._id,
				subCategory:item.subCategory.subCategoryName,
				productName:item.productName,
				productDiscription:item.productDiscription,
				productPrice:item.productPrice,
				productImage:item.productImage,
				productInStock:item.productInStock,
				productBrand:item.productBrand,
				productRating:item.productRating,
				sizesAvailable:item.sizesAvailable.length?item.sizesAvailable:undefined,
				colorsAvailable:item.colorsAvailable.length?item.colorsAvailable:undefined
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

exports.createProduct = async (req,res) => {
	try{
		let result = await persistance.createProduct(ProductModel,SubCategoryModel,req.params.subCategoryId,req.body,req.file.path);
		res.status(200).json({
			text : `created a new ${result.productName} product!.`,
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

exports.updateProduct = async (req,res) => {
	try{
		let result = await persistance.updateProduct(ProductModel,req.params.id,req.body);
		res.status(200).json({
			text:`updated ${result.productName} product!.`,
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

exports.deleteProduct = async (req,res) => {
	try{
		let result = await persistance.deleteProduct(ProductModel,SubCategoryModel,req.params.id);
		if(result.productImage){
			await unlinkAsync(result.productImage);
		}
		res.status(200).json({
			text:`deleted ${result.productName} product!.`,
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
