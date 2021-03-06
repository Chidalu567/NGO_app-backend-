const express = require('express');// require express from node modules
const app = express(); // create an express application
const cors = require('cors'); // require cors from nodemodules
const helmet = require('helmet'); // require helmet libnary from node modules
const dotenv = require('dotenv');

//configure access to environmental variables
dotenv.config();// configure with env variables

//external Router
const newsletterRouter = require('./router/handleEmail');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //configure bodyparser for easy access to form data

    //cross-origin-resource sharing configuration in nodejs
app.use(cors({
    origin: ['http://localhost:3000','https://ngo-application-fcr03h16z-chidalu567.vercel.app'],
    methods: ['POST'],
    optionsSuccessStatus: 200
}));

    // web security using helmetjs
app.use(helmet.xssFilter()); // avoid xss
app.use(helmet.hidePoweredBy()); // hide the language used to create the backend
app.use(helmet.noSniff()); //no port sniffing
app.use(helmet.contentSecurityPolicy());

    // external Routers
app.use('/api/', newsletterRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port <from server...>: ${process.env.PORT}`);
});