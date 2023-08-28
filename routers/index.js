const express = require('express');

const passport = require('../config/passport-local-strategy');

const router = express.Router();



const controllers = require('../controllers/home_controller');
const forgetController = require('../controllers/forgetPassword');

router.get('/',controllers.home);
router.post('/create-user',controllers.createUser);
router.get('/sign-up',controllers.signup);
router.get('/sign-in',controllers.signin);

router.get('/profile', passport.checkAuthentication,controllers.profile);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/sign-in'},
),controllers.createSession)


router.get('/sign-out',controllers.signOut);

router.post('/create-post',passport.checkAuthentication,controllers.createPost);
router.post('/post-comment',controllers.postComment);

router.get('/delete-post/:id', controllers.deletePost);

router.get('/delete-comment/:id', controllers.deleteComment);


router.get('/profile-update/:id', controllers.updateProfilePage);

router.post('/update-user-profile',controllers.updateUserProfile)

router.get('/user/auth/google',passport.authenticate('google',{scope:['profile', 'email']}));
router.get('/user/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}), controllers.createSession);



router.get('/forget-page',forgetController.forgetPage);
router.post('/forget-password',forgetController.handleForget);
router.get('/reset-password',forgetController.resetPassword);

module.exports = router;