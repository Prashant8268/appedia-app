const express = require('express');

const passport = require('../config/passport-local-strategy');

const router = express.Router();



const controllers = require('../controllers/home_controller');
const forgetController = require('../controllers/forgetPassword');

router.get('/',controllers.home);
router.get('/sign-up',controllers.signup);
router.get('/sign-in',controllers.signin);


router.get('/sign-out',controllers.signOut);

router.get('/forget-page',forgetController.forgetPage);
router.post('/forget-password',forgetController.handleForget);
router.get('/reset-password',forgetController.resetPassword);

router.use('/likes',require('./likes'));
router.use('/comments',require('./comments'));
router.use('/posts',require('./posts'));
router.use('/user',require('./user'));

module.exports = router;