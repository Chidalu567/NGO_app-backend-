const dotenv = require('dotenv');
const mailingAgent = require('../utils/mailingAgent');
const Mailmodel = require("../model/mailModel");

// configure dotenv
dotenv.config();


// Router controller created to extend the router function
exports.mailController = async (req, res) => {
    // get the customer information
    const { email } = req.body;


    // check if email exist in database
    const emailExist = await Mailmodel.findOne({ email: email });
    if (emailExist) {
        // send a different mail to user stating that we have them in our system
        // send response to client that email exist
        res.status(200).json({ info:"We would notify you for any new event from SirPhilip" , loading:"Checking for your registration",success:"You registered previously, we have you in our system"});
    } else {
        // store email in database
        const storeEmail = await Mailmodel.insertMany({ email: email });
        console.log("From mailController -> ", "User created successfully", storeEmail);

        // send a mail to the new user welcoming them to the system
        const sendMail = mailingAgent(email);

        // send response to user that email stored already
        res.status(200).json({info:"We would notify you for any new event from SirPhilip",loading:"Checking your registration",success:`Congrats!!!, You have subscribed to our newletter.` });

    }
}