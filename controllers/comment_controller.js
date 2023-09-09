const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const nodeMailer = require('../mailers/comment_mailer.js');

module.exports.postComment= async(req,res)=>{

    try{
        const post =  await Post.findById(req.body.post);
        if(post){
            let comment= await Comment.create({
                content:req.body.comment,
                post: req.body.post,
                user:req.user._id
            })
             post.comments.push(comment); 

             comment = await comment.populate('user', 'name email')
            //  nodeMailer.newComment(comment);
            // above is for sending mails for comments


             await post.save();
             if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment, 
                        user:req.user.name,
                        postId: post.id
                    },
                    message:"Comment posted"

                })
        }
        

        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err, '<---error in postComments controller')
    }



}

//  controller for deleting a comment 


module.exports.deleteComment = async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id).populate('post');
        if(req.user.id == comment.user || req.user.id == comment.post.user){
            await Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}});
            await comment.deleteOne({id: req.params.id});
        }
        return res.redirect('back');
    }
    catch(err){
            console.log(err, '<---at deleteComment controller ');
    }
}
