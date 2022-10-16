const express = require('express'); // ---- Require express from node_modules
const router = express.Router(); // ---- Create a router instance
const c = require('../controllers/checkoutController')

router.post('/create-checkout-session',c.checkoutHandler); // ---- post request


module.exports = router; // ---- export router for external access