const User = require('../model/userSchema');
const Student = require ('../model/studentSchema');
const Interview = require('../model/interviewSchema');



module.exports.home = async (req,res)=>{
    try{
        // populate the user of each post
       let students = await Student.find({});
       let interviews = await Interview.find({});

       return res.render('home', {
           title: "IM-Interview",
           students:  students,
           interviews: interviews
       });

   }catch(err){
       console.log('Error', err);
       return;
   }
}