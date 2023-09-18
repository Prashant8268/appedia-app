const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Friendship = require('../models/Friendship');



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

   

// for updating user profile
const fs = require('fs');
const path = require('path'); 
const { ConnectionStates } = require('mongoose');
const { Console } = require('console');

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

 // controller for profile update

 module.exports.updateProfilePage = async(req,res)=>{

    try{
        const user = await User.findById(req.params.id) .populate({
            path: 'friends',
            populate: [
                { path: 'from_user', select: 'name' },
                { path: 'to_user', select: 'name' }
            ]
        });
        let areFriends;
        let pending=false;
        let rfu;
        let friendship;
        for(let i of user.friends){
            if(i.from_user.id==user.id && i.to_user.id==req.user.id){
                if(i.status=='accepted'){
                    areFriends=true;
                }
                else if(i.status=='pending'){
                    pending=true;     
                }
                friendship=i;
            }
            else if (i.from_user.id==req.user.id && i.to_user.id==user.id){
                if(i.status=='accepted'){
                    areFriends=true;
                }
                else if(i.status=='pending'){
                    pending=true;
                    rfu = 'Request Sent'
                }
                friendship=i;

            }
        }

        return res.render('profile_update',{
            title: 'Codeial',
            userw : user,
            areFriends,
            pending,
            rfu,
            friendRequest:friendship
        })

    }

    catch(err){
            console.log(err, '<-----at updateprofilepage');
    }

}


// controller for adding a friend

module.exports.addFriend = async(req,res)=>{
    const to_user = await User.findById(req.query.id);
    const friendship = await Friendship.create({
        to_user:to_user.id,
        from_user:req.user.id,
        status:'pending'
    });

    const from_user = await User.findById(req.user.id);
    to_user.friends.push(friendship);
    to_user.save();
    from_user.friends.push(friendship);
    from_user.save();
    return res.redirect('back')

}

// accepting a friend request 

module.exports.acceptRequest= async(req,res)=>{

    try{
        const friendship = await Friendship.findById(req.query.id);
        console.log(friendship)

        const user1 = await User.findById(friendship.from_user);
        const user2 = await User.findById(friendship.to_user);
        console.log(user1, '<---user1')
        user1.friendsName.push(user2.id);
        user2.friendsName.push(user1.id);
        friendship.status='accepted';
        friendship.save();
        user1.save();
        user2.save();
        return res.redirect('back');
    }
    catch(err){
        console.log(err, 'error at acceptRequest');
    }

}

// reject or cancel a friend request 

module.exports.removeFriend = async(req,res)=>{
    const friendship = await Friendship.findByIdAndRemove(req.query.id);

    const from_user = await User.findById(friendship.from_user);
    from_user.friends.pull(friendship);

    const to_user= await User.findById(friendship.to_user);
    to_user.friends.pull(friendship);
    from_user.friendsName.pull(to_user.id);
    to_user.friendsName.pull(from_user.id);
    to_user.save();
    from_user.save();
    return res.redirect('back');

}