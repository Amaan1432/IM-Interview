
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
            return res.redirect('back');
        }
    
        let user = await User.findOne({email: req.body.email})
    
            if(!user){
                let user = await User.create(req.body)
                    if(user){return res.redirect('/user/signin')};
                }
    
        } 
    catch (error) { console.log(error);}
}
   

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout(function(err){
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('/');
    });

}

module.exports.signIn= (req , res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
 
    return res.render('user_signin',{
        title : 'IE-Interview',
    });
}
