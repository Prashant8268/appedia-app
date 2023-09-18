const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ],
    latestMessage: {
        type: String,
        default: " ",
    },

},
{
    timestamps:true
}
);

const Chatroom = mongoose.model('Chatroom',chatroomSchema);

module.exports = Chatroom;