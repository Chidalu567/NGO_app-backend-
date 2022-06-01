const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// configuration options
dotenv.config();

const email_address = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;

// create a transporter object
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: email_address,
        pass: password
    }
});



// Function that send mail
const MailingAgent = async(param) => {
    // check if param is not false
    if (param.email) {
            //mail object
        const mailOptions = {
            from: `<${email_address}>`,
            to: `${param.email}`,
            subject: "Registration to Sir Philip Organization",
            html: "<html><head><title>Sir Philip Organization Registration</title><body><h2>Registration Successful</h2><p>Dear Registered user, Bear with us as we are still improving our mailiing template. Your data is stored in our database and we would notify on every event. Thanks</p></body></head></html>",
        }
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
}

module.exports = MailingAgent;