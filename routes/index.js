const express= require('express');
const router = express.Router();
const homeController =require('../controller/home_controler');
const usersController = require('../controller/users_controller');
const passport = require('passport');
router.get('/',passport.checkAuthentication, homeController.home);

router.use('/user', require('./user'));

router.use('/student', require('./student'));

module.exports = router;