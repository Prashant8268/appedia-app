const express = require('express');

const router = express.Router();



const controllers = require('../controllers/home_controller');

router.get('/',controllers.home);

module.exports = router;