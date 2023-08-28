const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');



exports.newComment = (comment)=>{

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:'godne1029@gmail.com',
        to:comment.user.email,
        subject:'new commet added',
        html:  htmlString
    },(err, info)=>{
        if(err){
            console.log(err ,'error in new comment');
            return ;
        }
        console.log('message sent', info);
    })
}