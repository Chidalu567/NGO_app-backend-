const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { StaffModel } = require('../model/staffModel');

// options used to decrypt the token in client header when the middle ware runs
const optsForJwt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Secret key for jwt authentication"
}

console.log(process.env.SecretKey);

// create a jwt strategy
passport.use(new Strategy(optsForJwt, (jwt_payload, done) => {
    StaffModel.findOne({ email: jwt_payload.email }, (err, user) => {
        // token is not valid
        if (err) {
            return done(err, null);
        }

        // token is valid and staff is found
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))

