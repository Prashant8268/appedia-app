const mongoose = require('mongoose')

const forgetTokenSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isValid:{
        type: Boolean,
    },
    value:{
        type:String,
        required: true
    }

},
{
    timestamps: true
    
}); 


const ForgetP = mongoose.model('ForgetP', forgetTokenSchema);

module.exports = ForgetP; 