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

const sassMiddleware = require('node-sass-middleware')

// storing cookie in mongo 
app.use(sassMiddleware({
    src: './assets/scss',
    dest: 'assets/css',
    debug:true,
    prefix: '/css',
    err:(err)=>{
        console.log(err,"-->at sass middleware")
    }
}))

app.use(express.static('./assets'));




const MongoStore =  require('connect-mongo')

// setting up session

app.use(session({ 
    name:"codeial",
    saveUninitialized:false,
    secret: "blahsomething",
    resave: false,
    cookie:{
        maxAge: (1000*60*10)
    },
    store:MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial',
        autoRemove: 'disable'
    },(err)=>{
        console.log(err,"--->here at mongostore ");
    })
}))

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);




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