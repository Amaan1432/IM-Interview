const express= require('express');
const router = express.Router();
const homeController =require('../controller/home_controler');
const usersController = require('../controller/users_controller');
const passport = require('passport');
router.get('/',passport.checkAuthentication, homeController.home);
router.get('/user/profile', passport.checkAuthentication, usersController.profile);
router.post('/user/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);

module.exports = router;