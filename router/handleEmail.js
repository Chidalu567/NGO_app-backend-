// express app and router configuration
const express = require('express');
const router = express.Router(); // create an express router
const c = require('../controllers/mailController');

// handle request
router.post('/newsletter',c.mailController);


module.exports = router;