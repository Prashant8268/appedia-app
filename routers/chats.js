const express = require('express');

const router = express.Router();
const chats_controller = require('../controllers/chats_controller');
const passport = require('../config/passport-local-strategy');


router.get('/',passport.checkAuthentication, chats_controller.chatSection);

router.post('/r-chats-present',passport.checkAuthentication,chats_controller.areChatsPresent);



module.exports = router;
