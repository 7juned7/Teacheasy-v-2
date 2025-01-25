const express = require('express');

const { registerUser, Login } = require('../controllers/userControllers');

const router = express.Router()

router.route('/').post(registerUser);
router.route('/login').post(Login);

module.exports = router;