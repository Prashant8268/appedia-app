const JWT = require('jsonwebtoken');
const User = require('../../../models/User');

module.exports.createSession = async(req,res)=>{
    try{
        let user = await User.findOne({email: req.body.email});
        console.log('we are here ')

        if(!user || user.password !=req.body.password){
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }

        return res.status(200).json({
            message: 'Sign in successfully , here is you token keep it safe',
            data:{
                token: JWT.sign(user.toJSON(), 'apedia', {expiresIn: '10000'})
            }
        })
    }
    catch(err){
        console.log(err, "<-- at create session in user_api");
    }
}