const express = require('express');

const postController = require('../../../controllers/api/v1/posts');


const router = express.Router();

router.get('/posts',postController.index);


module.exports = router; 