const express = require('express');

const router = express.Router();
const chats_controller = require('../controllers/chats_controller');


router.get('/',chats_controller.chatSection);



module.exports = router;
