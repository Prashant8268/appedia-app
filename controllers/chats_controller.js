
const User = require('../models/User');
const Message = require('../models/Message')
const Chatroom = require('../models/Chatroom');
const { chat } = require('googleapis/build/src/apis/chat');
// const { chat } = require('googleapis/build/src/apis/chat');
module.exports.chatSection=async(req,res)=>{


    const user = await User.findById(req.user.id)
    .populate({
      path: 'chats',
      populate: [
        {
            path: 'sender',
            select: 'name avatar'
          
        },
        {
            path: 'receiver',
            select: 'name avatar'
          
        }
      ]
    })

    const users = await User.find();
    return res.render('chat_section',{
        title:'Codeial | Chats',
        chats:user.chats,
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
                receiver:user2.id,
                latestMessage:true
            });
            user1.chats.push(isPresent);
            user2.chats.push(isPresent);
            user2.save();
            user1.save();
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