const express  = require('express');
const path = require('path');
const router = require('./routers');

const cookieParser = require('cookie-parser');



const app = express();

app.use(cookieParser());
app.use(express.urlencoded());

const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs');

app.set('views', './views');
app.use(express.static('./assets'));

const port = 5000;

// setting router ;
// below you can also use only './routers as it will point to index auto

app.use('/',require('./routers'))






app.listen(port,(err)=>{
    if(err){
        console.log('Error in starting server');
        return ;
    }

    console.log(`Server is running on ${port}`);
})