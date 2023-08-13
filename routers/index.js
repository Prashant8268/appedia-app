const express = require('express');

const router = express.Router();



const controllers = require('../controllers/home_controller');

router.get('/',controllers.home);


router.post('/login',controllers.login)

router.get('/sign-up',controllers.signup);
router.post('/create-user',controllers.createUser);

router.get('/sign-out',controllers.signout);

module.exports = router;