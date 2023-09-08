const express = require('express');

const router = express.Router();
const chats_controller = require('../controllers/chats_controller');


router.get('/',chats_controller.chatSection);

router.post('/r-chats-present',chats_controller.areChatsPresent);



module.exports = router;
