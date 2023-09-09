const express = require('express');
const userController = require('../controllers/user_controller')
const passport = require('../config/passport-local-strategy');

const router = express.Router();
router.get('/auth/google',passport.authenticate('google',{scope:['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}), userController.createSession);
router.post('/create-user',userController.createUser);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/sign-in'},
),userController.createSession);

router.get('/profile-update/:id', passport.checkAuthentication,userController.updateProfilePage);
router.post('/update-user-profile',passport.checkAuthentication,userController.updateUserProfile);

router.get('/add-friend',passport.checkAuthentication,userController.addFriend)

router.get('/accept-request',passport.checkAuthentication,userController.acceptRequest);
router.get('/remove-friend',passport.checkAuthentication,userController.removeFriend);

module.exports = router;
