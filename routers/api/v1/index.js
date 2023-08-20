const express = require('express');


const router = express.Router();

router.get('/posts', require('./posts'));


module.exports = router; 