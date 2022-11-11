const express = require('express');
const router = express.Router();
const c = require('../controllers/frontgalleryController');

// The get request -> gives a list of all gallery component(title,description,date,photo) stored in Airtable
router.get('/list-gallery', c.Gallery);

module.exports = router;