
const { model } = require('mongoose');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const nodeMailer = require('../mailers/comment_mailer.js');



// controller for homepage 
module.exports.home =async(req,res)=>{
    try{  
            const posts = await Post.find().populate('user','name avatar').populate({
                path:'comments',
                populate:{
                    path:'user', select: 'name',
                },
                // populate:('likes')
            }).populate('likes');

            const users = await User.find();

            return res.render('./homepage.ejs',{
                title:"Codeial",
                posts,
                users: users
            });

       
    }
    catch(err){
        console.log(err, '<--- error at home controller line 38')
    }


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








// controller for signing out 

module.exports.signOut = (req,res)=>{

    try{
        req.session.destroy(err => {
            if (err) {
              console.error('Error in  destroying session:', err);
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
