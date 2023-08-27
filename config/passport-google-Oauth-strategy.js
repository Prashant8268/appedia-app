const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const details = require('./creditials')

const User = require('../models/User');

passport.use(new googleStrategy({
        clientID: details.clientID,
        clientSecret: details.clientSecret,
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