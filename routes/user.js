const express= require('express');
const router = express.Router();
const usersController = require('../controller/users_controller');
const passport = require('passport');

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
), usersController.createSession);

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);
router.get('/signin',usersController.signIn);
router.get('/signup',usersController.user_signup);

module.exports = router;