const nodemailer = require('../config/nodemailer');


exports.forgetPassword = (AccessToken)=>{
    let htmlString = nodeMailer.renderTemplate({AccessToken: AccessToken}, '/forget_password.ejs')
    nodemailer.transporter.sendMail({
        from:'godne1029@gmail.com',
        to:AccessToken.user.email,
        subject:'Forget password',
        html:  htmlString
    },(err, info)=>{
        if(err){
            console.log(err ,'error in new comment');
            return ;
        }
        console.log('message sent', info);
    })
}