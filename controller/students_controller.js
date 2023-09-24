const Student = require('../model/studentSchema');
const Interview = require('../model/interviewSchema');
const { Parser } = require('json2csv');


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

module.exports.scheduleInterview = async (req,res)=>{
    const {id,company,date} = req.body;
  try {
    const newstudent = await Student.findById(id);

    if (newstudent) {
      const interview = {
        company,
        date,
        result: 'Pending',
      };
      newstudent.interviews.push(interview);
      newstudent.save();
    }else{
        return res.redirect('back');
    }

    const existCompany = await Interview.findOne({ company: company });
    const studu = {
      student: id,
      date,
      result: 'Pending',
    };

    if (!existCompany) {
      const newCompany = await Interview.create({
        company: company,
      });
      newCompany.students.push(studu);
      newCompany.save();
    } else {
      for (let student of existCompany.students) {s
        if (student.student._id === id) {
            if (student.date ===date){
          return res.redirect('back');
            }
        }
      }
      existCompany.students.push(studu);
      existCompany.save();
    }
    return res.redirect('/student/home');
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};
    


module.exports.studentPage = async function (req, res) {
    try {
      const students = await Student.find({});
      return res.render('statusUpdatePage', { students ,
    title : 'IM-Interview'});
    } catch (error) {
      console.log(`Error in rendering page: ${error}`);
      return res.redirect('back');
    }
  };

module.exports.updateStatus = async (req,res)=>{
    const { id } = req.params;
    const { companyName, studentResult } = req.body;
    try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = studentResult;
          student.save();
          break;
        }
      }
    }else{
        return res.redirect('back');
    }
    const company = await Interview.findOne({ name: companyName });

    if (company) {
      for (let std of company.students) {
        /// compare student id and id passed in params
        if (std.student.toString() === id) {
          std.result = studentResult;
          company.save();
        }
      }
    }else{
        return res.redirect('back');
    }
    return res.redirect('/');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
}


module.exports.download= async (req,res)=>{
    try {
        // Fetch student data from the database
        const students = await Student.find({}, 'name email college placement dsa webD react interviews');
    
        // Define CSV fields mapping (optional)
        const fields = ['name', 'email', 'college', 'placement', 'dsa', 'webD', 'react', 'interviews'];
    
        // Convert student data to CSV format
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(students);
    
        // Set response headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    
        // Send the CSV data as a response
        res.status(200).send(csv);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports.delete = async (req,res)=>{
  const { id } = req.params;
  try {
    // find the student using id in params
    const student = await Student.findById(id);

    // find the companies for which interview is scheduled
    // and delete student from company interviews list
    if (student && student.interviews.length > 0) {
      for (let item of student.interviews) {
        const company = await Interview.findOne({ name: item.company });
        if (company) {
          for (let i = 0; i < company.students.length; i++) {
            if (company.students[i].student.toString() === id) {
              company.students.splice(i, 1);
              company.save();
              break;
            }
          }
        }
      }
    }
    await Student.findByIdAndDelete(id);
    res.redirect('back');
  } catch (error) {
    console.log('Error in deleting student');
    return res.redirect('back');
  }
}