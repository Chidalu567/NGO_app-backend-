const { Client } = require('pg');



//Client configuration
    // configuration for production
const prodConfig = {
    connectionString:process.env.DATABASE_URL
}

    // configuration for development
const devConfig = {
    user: "postgres",
    password: "God child@123",
    host: "localhost",
    port: 5432,
    database:"subscribe"
}

const client = new Client(process.env.NODE_ENV === 'production'?prodConfig:devConfig);

// connect to the database
client.connect();

module.exports = client; // export for other files to usew