
const User = require('../models/User');
const Message = require('../models/Message')
const Chatroom = require('../models/Chatroom');
const { chat } = require('googleapis/build/src/apis/chat');
// const { chat } = require('googleapis/build/src/apis/chat');
module.exports.chatSection=async(req,res)=>{

    // const chatroom = await Chatroom.create({
    //     name:'First_chatRoom',
    //     sender:req.user.id,
    //     receiver:req.user.id,
    //     latestMessage:'First message'
    // });

    // const message = await Message.create({
    //     content:'First Message',
    //     sender:req.user.id
    // });
    // chatroom.messages.push(message);
    // chatroom.save();

    const user = await User.findById(req.user.id).populate({
        path:'chats',
        populate:{
            path:'receiver', select:'name',
            path:'sender',select:'name',
            populate:{
                path:'messages',
                populate:'sender'
            }

        }

    });

    const users = await User.find();
    // const posts = await Post.find().populate('user','name avatar').populate({
    //     path:'comments',
    //     populate:{
    //         path:'user', select: 'name',
    //     },
    //     // populate:('likes')
    // }).populate('likes');
    
    return res.render('chat_section',{
        title:'Codeial | Chats',
        chats:[],
        users
    })
}

module.exports.areChatsPresent = async (req,res)=>{
    try{
        const user2 = await User.findOne({email:req.body.userEmail});
        const user1 = await User.findById(req.user.id); 


        let isPresent = await Chatroom.findOne({name: user1.id+user2.id}).populate({
            path:'messages',

        })
        if(!isPresent){
            isPresent = await Chatroom.findOne({name:user2.id+user1.id}).populate({
                path:'messages',
            })
        }

        if(!isPresent){
            isPresent = await Chatroom.create({
                name:user1.id+user2.id,
                sender:user1.id,
                receiver:user2.id
            })
        }
        return  res.status(200).json({
            Message: 'Successfull called',
            chatroom: isPresent,
            user1:user1.id,
            user2:user2.id
        })

    }
    catch(err){
        console.log(err, 'error at areChats Present_controller');
        return ;
    }

}