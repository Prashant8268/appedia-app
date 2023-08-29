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

router.get('/profile-update/:id', userController.updateProfilePage);
router.post('/update-user-profile',userController.updateUserProfile)

module.exports = router;
