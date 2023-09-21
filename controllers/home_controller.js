
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

            const LoggedUser = await User.findById(req.user.id).populate('friendsName' , 'name')
            .populate({
                path:'friends',
                populate:[
                    {
                        path:'from_user', select:'name',
                    },
                    {
                        path:'to_user',select:'name'
                    }
                ]
            });
            let users = await User.find();
            users = users.map((item)=>({
                id:item._id,
                _id:item._id,
                name:item.name
            }))
            users = users.filter(item=>item.id!=req.user.id)
            let friendships = LoggedUser.friends;
            friendships = friendships.filter(item=>item.status =='pending');

            return res.render('./homepage.ejs',{
                title:"Codeial",
                posts,
                friends:LoggedUser.friendsName,
                friendships,
                users
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

    if(!req.query.logout){
        return  res.render('sign_in',{
            title: "Apedia "
        })

    }
    let flash = {};
    flash.success='Logout Successfully'
    console.log('flash', flash)
    return  res.render('sign_in',{
        title: "Apedia ",
        flash
    
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
  