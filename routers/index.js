const express = require('express');

const router = express.Router();



const controllers = require('../controllers/home_controller');

router.get('/',controllers.home);

router.get('/sign-up',controllers.signup);
router.post('/create-user',controllers.createUser);

module.exports = router;