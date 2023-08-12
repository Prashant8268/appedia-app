const express  = require('express');

const app = express();

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        console.log('Error in starting server');
        return ;
    }

    console.log(`Server is running on ${port}`);
})