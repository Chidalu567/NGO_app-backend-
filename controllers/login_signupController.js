const joi = require('joi');
const { StaffModel } = require('../model/staffModel');
const { hash, compare, genSalt } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/cloudinary_config');

// expected structure of req.body for signup api
const clientSignupSchema = joi.object({
    firstname: joi.string().min(3).required(),
    lastname: joi.string().min(3).required(),
    email: joi.string().email().required(),
    date_of_birth: joi.string().required(),
    password: joi.string().min(5).required(),
    file: joi.string(),
});

// expected structure of req.body for login api
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password:joi.string().required()
})


// Login Controller
exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    // check if req.body matches our document schema
    const { error } = loginSchema.validate(req.body);
    console.log(error);

    if (!error) {
       // check if user exist in database
        const staffExist = await StaffModel.findOne({ email: email });


        // if staff exist compare the password hash and see if password matches
        if (staffExist) {
            compare(password, staffExist.password, (err, resp) => {
                if (resp) {
                    // generate token and send to frontend.
                    const payload = {
                        firstname: staffExist.firstname,
                        lastname: staffExist.lastname,
                        email: staffExist.email
                    };
                    const token = jwt.sign(payload, `${process.env.SecretKey}`, { expiresIn: '1d' });
                    return res.status(200).json({ code: 1, msg: "Loggin staff into admin center, wait....", token: "Bearer " + token, person:[staffExist.firstname,staffExist.lastname] });
                }
                // when password does not match the hashed staff password in database
                return res.status(200).json({ code:2,msg: "Password does not match" });
            })
        }

        // when staff does not exist at all in database
        if (!staffExist) {
            return res.status(200).json({code:3,msg:"Account not found, try creating a new account"})
        }
    }

    if (error) {
        res.status(400).json({ msg: "One of the field is incorrect, cross check that you filled all fields" });
    }
}


// Signup controller
exports.signupController = async (req, res) => {
    const { firstname, lastname, email, date_of_birth, password } = req.body;
    // Check if the req.body contains datas to create an instance of the schema(document)
    const { error } = clientSignupSchema.validate(req.body);

    if (!error) {
       // check if user exist in database
        const staffExist = await StaffModel.findOne({ email: email });
        // if user does not exist
        if (!staffExist) {
            // hash user password using bcrypt and save new staff info to database
            genSalt(10, (err, salt) => {
                hash(password, salt, (err, hash) => {
                    const newStaff = new StaffModel({ firstname, lastname, date_of_birth, email, password:hash});
                    newStaff.save();
                    if (err) {
                        console.error(err);
                    }
                })
            })
            return res.status(200).json({code:1, msg: "Hurray, Your account has been created already"});
        }

        // if userExist is true
        return res.status(200).json({code:2,msg:"Staff already exist already, Please try signing in as we reject duplicate."})
    }
    console.error(error)
    // if there is an error in the data sent in req.body.
    return res.status(400).json({code:3,msg:"One of the field is empty, make sure your password is longer than 5 and email is correct!! "})
}