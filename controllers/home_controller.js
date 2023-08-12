
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


    if(req.body.password !==req.body.confirmPassword){
        console.log('Password do not match');
        return res.redirect('back');
    }

    const aleradyExist = await  User.findOne({email:req.body.email});
    if(aleradyExist){
        console.log('User already Present ');
        return res.redirect('back');
    }

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