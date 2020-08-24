const Router = require('express').Router();
const controller = require('../controllers/customersController');
const customerTokenValidation = require('../middleware/customerTokenValidation');
const adminTokenValidation = require('../middleware/adminTokenValidation');
//CRUD routes for categories
Router.get('/',adminTokenValidation,controller.getCustomers);
Router.post('/register',controller.registerCustomer);
Router.post('/signin',controller.signin);
Router.patch('/update/:id',customerTokenValidation,controller.updateCustomer);
Router.delete('/delete/:id',customerTokenValidation,controller.deleteCustomer);

module.exports = Router;