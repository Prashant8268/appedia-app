const express = require('express');


const router = express.Router();

router.use('/v1',require('./v1'));
router.use('/speech',(req,res)=>{
    console.log(req.body,'<----speech')

    return res.status(200).json({
        message:'Successfull hai'
    })
})

module.exports = router; 