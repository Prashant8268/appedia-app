const mongoose = require('mongoose');
const { modelName } = require('./Like');

const friendshipSchema = new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    {
        timestamps: true
    }
);

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;
