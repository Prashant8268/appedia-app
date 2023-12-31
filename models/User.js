const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const   AVATAR_PATH =   path.join('/uploads/users/avatars');




const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required: true
        },
    
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String, 
            required: true
        },
        avatar:{
            type: String,
        },
        chats:[
          {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Chatroom'
          }
        ],
        friends:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
          }
        ],
        friendsName: [
          {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
          }
        ]

},
{
    timestamps:true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  

//   static 
  userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar')
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;