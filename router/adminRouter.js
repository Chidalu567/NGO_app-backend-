const express = require('express');
const router = express.Router(); // create an express external router object
const c = require('../controllers/adminController');

router.post('/gallery', c.galleryHandler);

module.exports = router;
