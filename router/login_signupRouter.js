const express = require('express');
const router = express.Router();
const c = require('../controllers/login_signupController');

// All external API routes
router.post('/login',c.loginController);
router.post('/signup',c.signupController);

module.exports = router;