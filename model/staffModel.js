const mongoose = require('mongoose');

// create the design of the database document (Schema)
const StaffSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String,required: true },
    date_of_birth: { type: String, required: true },
    password: { type: String, required: true },
    photo_id:{type:String},
    t_n_c :{type: Boolean},
},{collection:'staffprofile'})

// create a database model for our code, the instance of the model is a document

const StaffModel = mongoose.model('staffmodel', StaffSchema);

module.exports = { StaffModel };