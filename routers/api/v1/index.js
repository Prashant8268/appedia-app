const express = require('express');


const router = express.Router();

router.get('/',(req,res)=>{
    return res.json({
        message: "here at va index"
    })
})
router.get('/posts', require('./posts'));
router.use('/users', require('./users'));


module.exports = router; 