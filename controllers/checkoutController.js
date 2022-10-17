const axios = require('axios');
const mailmodel = require('../model/mailModel');

exports.checkoutHandler = async (req, res) => {
    // collect client details
    const { name, email, country, amount, phone } = req.body;

    // check if email in database if not save email and phone number and name
    const phoneExist = await mailmodel.findOne({ phonenumber: phone });
    const nameExist = await mailmodel.findOne({ username: name });

    if (!phoneExist && !nameExist) {
        const createUser = await mailmodel.insertMany({ username: name, phonenumber: phone });
    }
    // convert the amount to NGN
    const getFinalAmount = () => {
        if (country === "AUS") {
            const rate_amount = 274;
            const final_amount = rate_amount * Number(amount);
            console.log(final_amount)
            return final_amount;
        } else {
            return amount;
        }
    }



    // create a transaction detail
    const transaction_detail = {
        tx_ref: "sirPhilip_xyz",
        customer: {
            email: email,
            name: name,
            phonenumber:phone,
        },
        currency: "NGN",
        redirect_url: "https://www.sirphilip.org/",
        payment_options: "card",
        amount:`${getFinalAmount()}`,
    }

    // initiate a post request to flutterwave
    const response = await axios({
        url: "https://api.flutterwave.com/v3/payments",
        method: "post",
        data: transaction_detail,
        headers:
        {
            Authorization: `Bearer ${process.env.FLW_Secret_Key}`
        }
    });


    // return the link created to the client
    res.status(200).json({msg:"created payment link",link:response.data.data.link})
}

