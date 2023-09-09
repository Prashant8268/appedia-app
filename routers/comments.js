const express = require('express');

const router = express.Router();
const commentController = require('../controllers/comment_controller');
const passport = require('../config/passport-local-strategy');


router.get('/delete-comment/:id', passport.checkAuthentication,commentController.deleteComment);
router.post('/post-comment',passport.checkAuthentication,commentController.postComment);

module.exports = router;