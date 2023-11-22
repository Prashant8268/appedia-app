const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/User');

passport.use(new googleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL : process.env.CALLBACK_URL
    },
    async(accessToken,refreshToken,profile,done)=>{
      let user =   await User.findOne({email: profile.emails[0].value})
            if(user){
                return done(null,user);
            }
            else{
                let user = await User.create({
                    email:profile.emails[0].value,
                    name: profile.displayName,
                    password:crypto.randomBytes(20).toString('hex')
                }); 
                return done(null, user)

            }
            
        
    }
));

module.exports  = passport; 