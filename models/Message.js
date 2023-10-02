const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type: String,
        required: true
    },
    chatroom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chatroom'
    }
},
{
    timestamps:true
}
);

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;
