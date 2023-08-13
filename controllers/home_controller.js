
const User = require('../models/User.js');


module.exports.home =async(req,res)=>{

    if(req.cookies.user_id){

        const user = await User.findById(req.cookies.user_id)    
        return res.render('profile',{
            title:"Codeial",
            user:user
        })
    }

    return res.render('./home.ejs',{
        title:"Codeial"
    });

}

module.exports.signup =  async(req,res)=>{

    if(req.cookies.user_id){

        const user = await User.findById(req.cookies.user_id);  
        return res.render('profile',{
            title:"Codeial",
            user
        })
    }

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



// checking auth ;

module.exports.login= async(req,res)=>{

    try{
        const isUserFound = await User.findOne({email:req.body.email});
        if(isUserFound){
            if(isUserFound.password===req.body.password){

                res.cookie('user_id',isUserFound.id)
                return res.render('profile',{
                    title:"Codeial",
                    user:isUserFound
                })
            }
            console.log('Username or password is incorect ');


            return res.redirect('back');

        }
        else{
            console.log('User not found ')
            return res.redirect('/');
        }
    }
    catch(err){
        console.log(err,"Error in login");
    }
     
}

// sign out 

module.exports.signout = (req,res)=>{
    

    res.clearCookie('user_id');


    return res.redirect('/');
}