const express  = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routers');
const fetch = require('node-fetch');
const port = 5000;
const cors = require('cors');
const dotenv  =require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.json());

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT  = require('./config/passport-jwt-strategy'); 
const passportGoogle = require('./config/passport-google-Oauth-strategy');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');

app.set('views', './views');


const flash = require('connect-flash');
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

app.use('/uploads',express.static(__dirname + '/uploads'));
 



const MongoStore =  require('connect-mongo')

// config for chatScoket


const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(8000,()=>{
    console.log('chat server is listening on port 8000')

});


// setting up session

app.use(session({ 
    name:"codeial",
    saveUninitialized:false,
    secret: "blahsomething",
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        autoRemove: 'disable'
    },(err)=>{
        console.log(err,"--->here at mongostore ");
    })
}))

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

const Middleware = require('./config/middleware');
const { chat } = require('googleapis/build/src/apis/chat');

app.use(flash());
app.use(Middleware.setFlash);


// setting router ;
// below you can also use only './routers as it will point to index aut
app.use('/',require('./routers'))
app.use('/api', require('./routers/api'));



// Function to make a request to your server
const keepServerAwake = () => {
  const url = 'https://appedia-app.onrender.com'; 
  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log(`Successfully pinged ${url}`);
      } else {
        console.error(`Failed to ping ${url}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

setInterval(keepServerAwake, 300000);



app.listen(port,(err)=>{
    if(err){
        console.log('Error in starting server');
        return ;
    }
    
    console.log(`Server is running on ${port}`);
})