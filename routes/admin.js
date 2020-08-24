const Router = require('express').Router();
const controller = require('../controllers/adminController');

Router.post('/login',controller.login);

module.exports=Router;