const mongoose = require('mongoose');

// create a document schema
const MailSchema = new mongoose.Schema({
    email: { type: String, unique: true },
},{collection:"Mailing"});

// generate a model from the schema
const Mailmodel = mongoose.model("Mailmodel", MailSchema);

module.exports = Mailmodel;