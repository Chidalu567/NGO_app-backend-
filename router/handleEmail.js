// express app and router configuration
const express = require('express');
const router = express.Router(); // create an express router
const controller = require('../controllers/handleMail');

// handle request
router.post('/newsletter',controller.mail);


module.exports = router;