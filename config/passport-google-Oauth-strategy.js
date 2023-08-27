const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/User');

passport.use(new googleStrategy({
        clientID: "620087635721-v9gnbkrphmhgngdp87ohia6aba6eo5qd.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL :"http://localhost:5000/user/auth/google/callback"
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