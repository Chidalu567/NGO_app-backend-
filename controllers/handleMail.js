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
            const result = await client.query('SELECT user_email FROM subscribeduser WHERE user_email = $1', [email]);

            //check email does not exist
            if (result.rows.length === 0) {
                //insert the new email into the database
                const subscribeUser = await client.query('INSERT INTO subscribeduser(user_email) VALUES($1) RETURNING *', [email]);
                //send newsletter to email of user
                mailingAgent({ email: subscribeUser.rows.user_email });
                res.status(200).json({ msg:`${subscribeUser.rows.user_email} stored successfully`});
                res.end();
            } else { // email exist already
                //show message that email exist already in database
                mailingAgent({ email: email }); // send newsletter again to user
                res.status(200).json({ msg: `${email} is subscribed already` });
                res.end();
            }
        } catch (err) {
            console.log(err.stack);
        }
    } else {
        res.status(200).json({ error: "Enter your Mail" });
        res.end();
    }
}