const Router = require('express').Router();

Router.use('/categories',require('./categories'));
Router.use('/subcategories',require('./subCategories'));
Router.use('/products',require('./products'));
Router.use('/customers',require('./customers'));
Router.use('/admin',require('./admin'));

module.exports = Router;
