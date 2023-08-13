const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// telling passport to use User

const user = require('../models/User');
const User = require('../models/User');

passport.use(new LocalStrategy({
        usernameField:'email',
    },
    async(email,password, done)=>{

        const user = await User.findOne({email:email});



        if(!user || user.password!=password){
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
        const user = User.findById(id);
        
        return done(null,user);
    }
    catch(err){
        console.log(err, 'Error in finding user --> passport ')
    }

});


passport.checkAuthentication = async(req,res,next)=>{
   try{
    if(await req.isAuthenticated()){
        next();
        return ;
    }

    return await res.redirect('/');

   }
   catch(err){
    console.log(err, "Error at passport-> check authu")
   }

}

passport.setAuthenticatedUser = (req,res,next)=>{

    if(req.isAuthenticated()){
        console.log('ha ye callho gya ')
        res.locals.user = req.user;
        next();
    }
    next();
}
    





module.exports = passport;