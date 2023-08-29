const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User')



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
    
    module.exports.createSession = (req,res)=>{

        req.flash('success', "Logged in successfully");
        return res.redirect('/');
    
    }

    // controller for profile update

module.exports.updateProfilePage = async(req,res)=>{

    try{
        const user = await User.findById(req.params.id);

        return res.render('profile_update',{
            title: 'Codeial',
            userw : user
        })

    }

    catch(err){
            console.log(err, '<-----at updateprofilepage');
    }

}

// for updating user profile
const fs = require('fs');
const path = require('path'); 

module.exports.updateUserProfile = async(req,res)=>{

    try{
        // const user = await User.findByIdAndUpdate(req.user.id, {
        //     name : req.body.name,
        //     email: req.body.email
        // }) ; 
        const user = await User.findById(req.user._id);
        User.uploadedAvatar(req,res,(err)=>{
            if(err){
            console.log('Error at updateUserProfile controller',err);
            }
            user.name = req.body.name;
            user.email = req.body.email;
            console.log(req.file, '<--uploaded file');
            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                }
                user.avatar = User.avatarPath +'/'+ req.file.filename
            };

            user.save();
            return res.redirect('back');
            
        })


    }
    catch(err){
        console.log(err, 'error ')
    }
}