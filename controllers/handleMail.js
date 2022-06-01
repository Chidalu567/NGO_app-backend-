const dotenv = require('dotenv');
const client = require('../sqlconnection/connect');
const mailingAgent = require('../utils/mailingAgent');

// configure dotenv
dotenv.config();


// Router controller created to extend the router function
exports.mail = async (req, res) => {

    // collect value from the request
    const { email } = req.body;

    if (email) {

        // try block to catch errors
        try {

            // Check if email exist already in database
            const result = await client.query('SELECT email FROM subscribeduser WHERE email = $1', [email]);

            //check email does not exist
            if (result.rows.length === 0) {

                //insert the new email into the database
                const subscribeUser = await client.query('INSERT INTO subscribeduser(email) VALUES($1) RETURNING *', [email]);

                //send newsletter to email of user
                mailingAgent({ email: subscribeUser.rows.user_email });

                res.status(200).json({ stored: `${subscribeUser.rows.user_email} stored successfully` }); // send json response
                res.end(); // end response

            } else { // email exist already

                //show message that email exist already in database
                mailingAgent({ email: email }); // send newsletter again to user
                res.status(200).json({ Email_exist: `${email} is subscribed already` });
                res.end();
            }
        } catch (err) {
            console.log(err.stack);
        }
    } else {
        res.status(200).json({ no_mail: "Enter your Mail" }); // send json response to frontend
        res.end(); // end response
    }

}