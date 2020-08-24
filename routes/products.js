const Router = require('express').Router();
const controller = require('../controllers/productsController');
const adminTokenValidation = require('../middleware/adminTokenValidation');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname );
  }
})

const fileFilter = (req,file,cb)=>{
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null,true);
	}else{
		cb(null,false);
	}
}
 
var upload = multer({ storage: storage,fileFilter:fileFilter })

//CRUD routes for categories
Router.get('/:subCategoryName',controller.getProducts);
Router.post('/create/:subCategoryId',adminTokenValidation,upload.single('productImage'),controller.createProduct);
Router.patch('/update/:id',adminTokenValidation,controller.updateProduct);
Router.delete('/delete/:id',adminTokenValidation,controller.deleteProduct);

module.exports = Router;