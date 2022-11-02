// express app and router configuration
const express = require('express');
const router = express.Router(); // create an express router
const c = require('../controllers/mailController');

// --------Schema definition -----------
/**
 * @swagger
 * components:
 *  schemas:
 *   EmailRegistration:
 *    type: object
 *    required:
 *     - email
 *    properties:
 *     email:
 *      type: string
 *      description: Clients email to be stored in database. we would generate an Id for each client through the email
 *    example:
 *     email: cokechukwu@bcsstd.nsw.edu.au
 *  responses:
 *   EmailRegistration:
 *    type: object
 *    properties:
 *     info:
 *      type: string
 *      description: Information of upcoming events to registered client
 *     loading:
 *      type: string
 *      description: Loading information to be displayed on the messagebox
 *     success:
 *      type: string
 *      description: Success in registering client
 */

// ------ documenting the post request /newsletter api
/**
 * @swagger
 * /newsletter:
 *  post:
 *   summary: This api takes email in req.body and stores it in database
 *   name: newletter registration ApI
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/EmailRegistration"
 *   responses:
 *    "200":
 *     description: Client stored in database, email of successful registration sent to client
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/responses/EmailRegistration"
 */

// handle request
router.post('/newsletter',c.mailController);


module.exports = router;