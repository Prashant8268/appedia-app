const express = require('express');

const passport = require('../config/passport-local-strategy');

const router = express.Router();



const controllers = require('../controllers/home_controller');

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

module.exports = router;