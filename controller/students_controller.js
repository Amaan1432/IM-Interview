const Student = require('../model/studentSchema');

module.exports.addStudent =(req,res)=>{
    res.render('studentForm',{
        title : "IE-Interview"
    })
}

module.exports.createStudent = async (req,res)=>{
    try {
        let student = await Student.findOne({email : req.body.email});
        if (student){
            return res.redirect('/');
        }
        let newStudent = await Student.create(req.body);
        await newStudent.save();
        return res.redirect('/');
    } catch (error) {
        console.log(`Error in creating student: ${error}`);
        return res.redirect('back');
        
    }
}


module.exports.allocateInterview = async (req,res) => {
    try {
        let students = await Student.find({});
        return res.render('interviewForm',{
            title : 'IM-Interview',
            students,
        })
        
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.redirect('back');
        
    }
}