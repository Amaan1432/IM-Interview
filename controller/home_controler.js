const User = require('../model/userSchema');
const Student = require ('../model/studentSchema');
const Interview = require('../model/interviewSchema');
const Scores = require('../model/finalScoresSchema')



module.exports.home = async (req,res)=>{
    try{
        // populate the user of each post
       let users = await User.find({})
       .sort('createdAt')
       .select('-password')
   
       let students = await Student.find({})

       return res.render('home', {
           title: "IM-Interview",
           all_students:  students,
           all_users: users
       });

   }catch(err){
       console.log('Error', err);
       return;
   }
}