const express= require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controller/students_controller');



router.get('/addStudent',passport.checkAuthentication ,studentController.addStudent);

router.post('/createStudent',studentController.createStudent);

router.get('/allocateInterview',studentController.allocateInterview);

module.exports = router;