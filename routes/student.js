const express= require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controller/students_controller');



router.get('/addStudent',passport.checkAuthentication ,studentController.addStudent);

router.post('/createStudent',passport.checkAuthentication ,studentController.createStudent);

router.get('/allocateInterview',passport.checkAuthentication ,studentController.allocateInterview);

//student page api
router.get('/home',passport.checkAuthentication ,studentController.studentPage);

//for schedule Interview
router.post('/scheduleInterview',passport.checkAuthentication , studentController.scheduleInterview);

//for status upate for student
router.post('/updateStatus/:id',passport.checkAuthentication ,studentController.updateStatus);

router.get('/download',passport.checkAuthentication ,studentController.download);

module.exports = router;