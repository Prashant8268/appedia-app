const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');



exports.newComment = (comment)=>{
    console.log('inside new comment ',comment)

    nodemailer.transporter.sendMail({
        from:'godne1029@gmail.com',
        to:comment.user.email,
        subject:'new commet added',
        html:  '<h1>Yup ,your comment is added </h1>'
    },(err, info)=>{
        if(err){
            console.log(err ,'error in new comment');
            return ;
        }
        console.log('message sent', info);
    })
}