const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.toggleLikes = async(req,res)=>{
    try{
        // url type = likes/toggle?id=ajlksfd39&type = Post
        let likeable;
        let deleted = false;
        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes')
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes')
        }
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        if(existingLike){
           await likeable.likes.pull(existingLike._id);
            await likeable.save();
            deleted= true;
           await Like.deleteOne(existingLike);
        }
        else{
            let newLike = await Like.create({
                user: req.user._id,
                likeable:req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        if(req.xhr){
            return res.json({
                type:req.query.type,
                id:req.query.id,
                length:likeable.likes.length
            })
        }
        

        return res.json({
            message: 'Request successfull',
            data:{
                deleted: deleted
            }
        })
    }
    catch(err){
        if(err){
            console.log(err, '<<-at togglelike controller');
            return ;
        }
    }
}