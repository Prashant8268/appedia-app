const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');


// controller for creating a post 
module.exports.createPost = async(req,res)=>{

    try{
      const user = await User.findById(req.user.id);
      const post = await Post.create({
          content: req.body.content,
          user: req.user._id
      })
      
      if(req.xhr){
          return res.status(200).json({
              data:{
                  post:post,
                  username: user.name,
                  avatar:user.avatar
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
  

  
// controller for deleting a post 

 module.exports.deletePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.user ==req.user.id){
            await Comment.deleteMany({post: req.params.id});
            await post.deleteOne({id: req.params.id});
        }

        if(req.xhr){
            return res.status(200).json({
                data:{
                    postId:post.id
                },
                message: "Post deleted successfully "

            })
        }
        return res.redirect('back');

    }

    catch(err){  
            console.log(err,'eroor --> deletePost controller');
    }
 }
