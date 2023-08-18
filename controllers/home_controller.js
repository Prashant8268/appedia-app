
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
            const users = await User.find();
            return res.render('./homepage.ejs',{
                title:"Codeial",posts,
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


module.exports.profile = (req,res)=>{

    return res.render('profile',{
            title: 'Codeial',
        })
}

// controller for creating session or logging in 

module.exports.createSession = (req,res)=>{

    req.flash('success', "Logged in successfully");
    return res.redirect('/');

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



// controller for creating a post 
module.exports.createPost = async(req,res)=>{

  try{

    const user = await User.findById(req.user.id);
    const post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:'Post created'
        })
    }
    
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
        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err, '<---error in postComments controller line 150')
    }



}

// controller for deleting a post 

 module.exports.deletePost = async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
            await Comment.deleteMany({post: req.params.id});
            await post.deleteOne({id: req.params.id});
        }
        return res.redirect('back');

    }

    catch(err){  
            console.log('eroor --> deletePost controller');
    }
 }

//  controller for deleting a post 


module.exports.deleteComment = async(req,res)=>{
    try{
        
        const comment = await Comment.findById(req.params.id);
        if(req.user.id == comment.user){
            await Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}});
            await comment.deleteOne({id: req.params.id}); 
        }
        return res.redirect('back');
    }
    catch(err){
            console.log(err, '<---at deleteComment controller ');
    }
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

module.exports.updateUserProfile = async(req,res)=>{

    try{
        const user = await User.findByIdAndUpdate(req.user.id, {
            name : req.body.name,
            email: req.body.email
        }) ; 
        return res.redirect('back');

    }
    catch(err){
        console.log(err, 'error ')
    }

   
}