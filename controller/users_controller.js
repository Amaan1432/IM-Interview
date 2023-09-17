const { session } = require('passport');
const User = require('../model/userSchema');

module.exports.user_signup= (req,res)=>{
    if (req.isAuthenticated()){
        res.redirect('/signin')
    }
    return res.render('user_signup');
}

module.exports.user_signIn= (req,res)=>{
 
    return res.render('user_signIn');
}
module.exports.profile =(req,res)=>{
    return res.render('profile');
}

module.exports.create= async (req,res)=>{
   let {username,email,password,comfirm_password} = req.body;
   if (password != confirm_password){
    req.flash('error', 'password do not match');
    return res.redirect('back');
}
   let user = await User.findOne({email});
   if (user){
    req.flash('error', 'username already exist');
    return res.redirect('/signin');
   }else{
    let user= await User.create(req.body);
    if (user){
        req.flash('success', 'You have signed up, login to continue!');
        res.redirect('/signin');
   }
}
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