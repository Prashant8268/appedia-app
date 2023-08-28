const User = require('../models/User');
const ForgetP = require('../models/AccessToken');
const crypto = require('crypto');
const nodemailer = require('../mailers/forget_password');

module.exports.handleForget= async(req,res)=>{

    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            const AccessToken = await ForgetP.create({
                user:user.id,
                isValid: true,
                value:crypto.randomBytes(20).toString('hex')
            }); 

            await AccessToken.populate('user');
            
            nodemailer.forgetPassword(AccessToken);
            return res.send('Forget email send ');
        } 
        else{
            return res.send('user does not found');
        }
    }
    catch(err){
        if(err){
            console.log('error in handleforget',err);
            return ;
        }
    }

    

}

module.exports.forgetPage = (req,res)=>{
    return res.render('forgetPasswordForm',{
        title: "Forget Password"
    });
}

module.exports.resetPassword = async(req,res)=>{
    console.log(req.query.accessToken);
    return res.send('we are here');
}