const express  = require('express');
const path = require('path');
const router = require('./routers');
const port = 5000;


const cookieParser = require('cookie-parser');


const app = express();

app.use(express.urlencoded());

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');

app.set('views', './views');
app.use(express.static('./assets'));


// setting up session

app.use(session({ 
    name:"codeial",
    saveUninitialized:false,
    secret: "blahsomething",
    resave: false,
    cookie:{
        maxAge: (1000*60*20)
    }
}))

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// app.use(passport.setAuthenticatedUser());



// setting router ;
// below you can also use only './routers as it will point to index aut
app.use('/',require('./routers'))

app.listen(port,(err)=>{
    if(err){
        console.log('Error in starting server');
        return ;
    }

    console.log(`Server is running on ${port}`);
})