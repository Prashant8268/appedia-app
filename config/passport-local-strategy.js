const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// telling passport to use User

const User = require('../models/User');

passport.use(new LocalStrategy({
        usernameField:'email',
        // below allow req to send in below function
        passReqToCallback: true
    },
    async(req,email,password, done)=>{
        const user = await User.findOne({email:email});
        if(!user || user.password!=password){
            req.flash('success', 'Invalid email/password')
            return done(null,false);
        }
        return done(null, user);
    }
))

// serializing the user to decide which key is to be kept in cookis
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

// deserializing the user from the key in the cookies 

passport.deserializeUser(async(id,done)=>{

    try{
        const user = await  User.findById(id);
        return done(null,user);
    }
    catch(err){
        console.log(err, 'Error in finding user --> passport ')
    }

});


passport.checkAuthentication = (req,res,next)=>{
       if( req.isAuthenticated()){
            return next();
            
        }
     return res.redirect('/sign-in');




}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
    
module.exports = passport;