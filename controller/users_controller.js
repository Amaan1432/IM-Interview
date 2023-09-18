
const User = require('../model/userSchema');

module.exports.user_signup= (req,res)=>{
    if (req.isAuthenticated()){
        res.redirect('/user/signin')
    }
    return res.render('user_signup',{
        title : "IE-Interview"
    });
}

module.exports.profile =(req,res)=>{
    return res.render('profile');
}

module.exports.create= async (req,res)=>{
    try {
        if (req.body.password != req.body.confirm_password){
            req.flash('error', 'Passwords do not match');
            return res.redirect('back');
        }
    
        let user = await User.findOne({email: req.body.email})
    
            if(!user){
                let user = await User.create(req.body)
                    return res.redirect('/users/sign-in');
                }
    
        } 
    catch (error) { console.log(error);}
}
   

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/')

}

module.exports.signIn= (req , res)=>{
    if (!req.isAuthenticated()){
        return res.redirect('/user/signup')
    }
 
    return res.render('user_signin',{
        title : 'IE-Interview',
    });
}