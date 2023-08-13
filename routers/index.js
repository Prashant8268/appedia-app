const express = require('express');

const passport = require('../config/passport-local-strategy');

const router = express.Router();



const controllers = require('../controllers/home_controller');

router.get('/',controllers.home);

router.get('/sign-up',controllers.signup);
router.post('/create-user',controllers.createUser);

router.get('/profile', passport.checkAuthentication,controllers.login);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/'},
),passport.setAuthenticatedUser,controllers.login3)


module.exports = router;