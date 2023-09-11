const express= require('express');
const router = express.Router();
const homeController =require('../controller/home_controler');
const usersController = require('../controller/users_controller');
router.get('/', homeController.home);
router.get('/profile',usersController.profile);


module.exports=router;