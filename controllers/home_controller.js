
const User = require('../models/User.js');


module.exports.home =(req,res)=>{

    return res.render('./home.ejs',{
        title:"Codeial"
    });

}

module.exports.signup = (req,res)=>{

    return res.render('signup',{
        title:"Codeial"
    })
}

module.exports.createUser = async(req,res)=>{

try{

    await  User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

 
    return res.redirect('/')

}
catch(err){
  
        console.log(err, "error in creating user");
         return ;

}
}