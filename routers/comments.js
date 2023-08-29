const express = require('express');

const router = express.Router();
const commentController = require('../controllers/comment_controller');


router.get('/delete-comment/:id', commentController.deleteComment);
router.post('/post-comment',commentController.postComment);

module.exports = router;