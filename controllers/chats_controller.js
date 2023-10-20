
const User = require('../models/User');
const Message = require('../models/Message')
const Chatroom = require('../models/Chatroom');
const { chat } = require('googleapis/build/src/apis/chat');

module.exports.chatSection=async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        .populate({
          path: 'chats',
          populate: [
            {
                path: 'sender',
                select: 'name avatar email'
              
            },
            {
                path: 'receiver',
                select: 'name avatar email'
              
            }
          ]
        }).sort({ 'chats.updatedAt': 1 })
    
        let users = await User.find();
        users = users.map((item)=>({
            id:item._id,
            _id:item._id,
            name:item.name,
            email:item.email
        }));
        users = users.filter((user)=>user.id!=req.user.id);

        return res.render('chat_section',{
            title:'Codeial | Chats',
            chats:user.chats,  
            users
        })
    }
    catch(err){
        console.log(err, 'Error in chats controller');
    }

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
                latestMessage:true,
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
            user2
        })

    }
    catch(err){
        console.log(err, 'error at areChats Present_controller');
        return ;
    }

}


// Controller for deleting chats
module.exports.deleteChats = async(req,res)=>{
    try{
        const chatroom = await Chatroom.findById(req.body.chatroom._id);
        await Message.deleteMany({chatroom:chatroom._id});
        await Chatroom.deleteOne(chatroom);


        return res.status(200).json({
            'message': 'successfull'
        })

    }
    catch(err){
        console.log('error', err);
        return ;
    }
}


