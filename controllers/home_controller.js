
const { model } = require('mongoose');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const Friendship = require('../models/Friendship.js')
const nodeMailer = require('../mailers/comment_mailer.js');
const middleware = require('../config/middleware.js');
const { readerrevenuesubscriptionlinking } = require('googleapis/build/src/apis/readerrevenuesubscriptionlinking/index.js');



// controller for homepage 
module.exports.home =async(req,res)=>{
    try{
            const posts = await Post.find().populate('user','name avatar').populate({
                path:'comments',
                populate:{
                    path:'user', select: 'name',
                },
            }).populate('likes').sort({createdAt: -1});

            const LoggedUser = await User.findById(req.user.id).populate('friendsName' , 'name');
            const users = await User.find();

            return res.render('./homepage.ejs',{
                title:"Codeial",
                posts,
                users: users,
                friends:LoggedUser.friendsName
            });

       
    }
    catch(err){
        console.log(err, '<--- error at home controller line 38')
    }


}

// home page for going to sign-up page
module.exports.signup = (req,res)=>{
    return res.render('signup',{
        title:"Apedia"
    })
}

// controller for going to sign- in page
module.exports.signin = (req,res)=>{
    console.log(req.flash('success')[0], '<--msg')
    return  res.render('sign_in',{
        title: "Apedia ",
        flash:{
            success:'Logout Successfullly'
        }
    
    })
} 



// controller for signing out 

module.exports.signOut = async(req, res) => {
    try {
        await req.session.destroy();
        return res.redirect('sign-in?logout=true')

    } catch (err) {
      console.log(err, '<----controller signout');
    }
  }
  