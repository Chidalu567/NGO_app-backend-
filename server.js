const express = require('express');// require express from node modules
const app = express(); // create an express application
const cors = require('cors'); // require cors from nodemodules
const helmet = require('helmet'); // require helmet libnary from node modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');


    //configure access to environmental variables
dotenv.config();// configure with env variables


    // mongodb database cluster connection
mongoose.connect("mongodb+srv://fortune:Godchild@cluster0.gg9tlfa.mongodb.net/FortCodex?retryWrites=true&w=majority").then(() => {
    console.log("Connected to database cluster");
}).catch(err => {
    console.log("Error connecting to database cluster");
})

    //external Router
const newsletterRouter = require('./router/handleEmail');
const checkoutRouter = require('./router/handleCheckout');

    // middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //configure bodyparser for easy access to form data

    //cross-origin-resource sharing configuration in nodejs
app.use(cors({
    origin: ['http://localhost:3000','https://ngo-application-pr79jx6t3-chidalu567.vercel.app/'],
    methods: ['POST','GET'],
    optionsSuccessStatus: 200
}));

    // web security using helmetjs
app.use(helmet.xssFilter()); // avoid xss(cross site scripting)
app.use(helmet.hidePoweredBy()); // hide the language used to create the backend
app.use(helmet.noSniff()); //no port sniffing
app.use(helmet.contentSecurityPolicy());

    // external Routers
app.use('/api', newsletterRouter);
app.use('/api', checkoutRouter);

    // listen to post
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port <from server...>: ${port}`);
});