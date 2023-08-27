const nodemailer = require('nodemailer');
const {google} = require('googleapis');


const ejs = require('ejs');

const path = require('path');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service:'gmail',
    port: 587,
    secure:false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'goden1029@gmail.com',
      pass: 'ovkljgzpgktqzzru',
      // clientID: "620087635721-v9gnbkrphmhgngdp87ohia6aba6eo5qd.apps.googleusercontent.com",
      // clientSecret: "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",
    },
  });


  let renderTemplate = (data,relativePaht)=>{
    let mainHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer',relativePaht),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering ', err);
                return ;
            }
            mainHTML = template;
        }
    )
    return mainHTML;
  }

  module.exports ={
    transporter:transporter,
    renderTemplate: renderTemplate
  }