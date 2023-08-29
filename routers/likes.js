const express = require('express');

const router = express.Router();
const likesController = require('../controllers/likes_controller');

router.get('/',(req,res)=>{
    return res.json({
        message:"working"
    })
})

router.get('/toggle',likesController.toggleLikes);

module.exports = router;
