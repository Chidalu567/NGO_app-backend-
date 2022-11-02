const express = require('express');// require express from node modules
const app = express(); // create an express application
const cors = require('cors'); // require cors from nodemodules
const helmet = require('helmet'); // require helmet libnary from node modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


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
    origin:['https://www.spamfoundation.org',"http://localhost:3000","https://sporg.herokuapp.com"],
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

    // create swagger configuration
const options = {
    definition: { // definition or information about the doc
        openapi: "3.0.0", //open api version
        info: { // main information about the docs
            title: "SirPhilipOrganization Api",
            version: "1.0.0",
            description: "THe overal view of all api endpoints present in SirPhilp",
        },
        servers: [ // list of all servers to target
            {
                url: "http://localhost:5000/api",
            },
            {
                url:"https://sporg.herokuapp.com/api"
            },
        ]
    },
    apis:["./router/*.js"] // file position of all router configuration
}

    // create swager docs instance
const specs = swaggerJsDoc(options);

    // api endpoints for swagger docs
app.use('/api/swagger-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // listen to post
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port <from server...> ${process.env.PORT}`);
});