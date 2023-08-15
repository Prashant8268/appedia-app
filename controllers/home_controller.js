
const { model } = require('mongoose');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');


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
module.exports.home =async(req,res)=>{
    try{  
            const posts = await Post.find().populate('user','name').populate({
                path:'comments',
                populate:{
                    path:'user', select: 'name'
                }
            });

            console.log('posts', posts);
            return res.render('./homepage.ejs',{
                title:"Codeial",posts
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



// controller for creating a post 
module.exports.createPost = async(req,res)=>{

  try{


    const user = await User.findById(req.user.id);
    const post = await Post.create({
        content: req.body.content,
        user: req.user._id
    }); 
    
    return res.redirect('back');
  }
    catch(err){
        console.log(err,'<--- erron in createPost controller ')
    }
}


module.exports.postComment= async(req,res)=>{

    try{
        const post =  await Post.findById(req.body.post);
        if(post){
             post.comments.push( await Comment.create({
                content:req.body.comment,
                post: req.body.post,
                user:req.user._id
            })); 
             await post.save();
            console.log('post', post)
        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err, '<---error in postComments controller line 150')
    }



}