
const User = require('../models/User');
const Message = require('../models/Message')
const Chatroom = require('../models/Chatroom');
const { chat } = require('googleapis/build/src/apis/chat');
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

    }).populate({
        path:'friends',
        
    });
    // const posts = await Post.find().populate('user','name avatar').populate({
    //     path:'comments',
    //     populate:{
    //         path:'user', select: 'name',
    //     },
    //     // populate:('likes')
    // }).populate('likes');

    const chats =  user.chats;
    console.log(chats.length, 'length')
    
    return res.render('chat_section',{
        title:'Codeial | Chats',
        chats:[]
    })
}