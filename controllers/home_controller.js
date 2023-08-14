
const { model } = require('mongoose');
const User = require('../models/User.js');




// controller for creating a new user 

module.exports.createUser = async(req,res)=>{
try{
    if(req.body.password !=req.body.confirmPassword){
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
    return res.redirect('/sign-in')
}
catch(err){  
        console.log(err, "error in creating user");
         return ;
}
}



// controller for homepage 
module.exports.home =(req,res)=>{
    return res.render('./homepage.ejs',{
        title:"Codeial"
    });

}


// home page for going to sign-up page
module.exports.signup = (req,res)=>{
    return res.render('signup',{
        title:"Codeial"
    })
}

// controller for going to sign- in page
module.exports.signin = (req,res)=>{

    return  res.render('sign_in',{
        title: "Codeial "
    })
} 


module.exports.profile = (req,res)=>{

    return res.render('profile',{
            title: 'Codeial',
        })
}

// controller for creating session or logging in 

module.exports.createSession = (req,res)=>{
    return res.redirect('/');

}


// controller for signing out 

module.exports.signOut = (req,res)=>{

    try{
        // console.log('sign out ')
        // req.logout((err)=>{
        //     if(err){
        //         console.log('error -->log out  controller ');
        //     }
    
        // });
        req.session.destroy(err => {
            if (err) {
              console.error('Error destroying session:', err);
              return res.redirect('/'); // or handle the error as needed
            }
            req.user = null; // Clear the user object
            res.redirect('/sign-in'); // or any other appropriate action
          });

    }
    catch(err){
        console.log(err , '<----controller signout')
    }

}