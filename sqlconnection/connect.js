const Pool = require('pg').Pool;



//Client configuration
    // configuration for production
const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
}

    // configuration for development
const devConfig = {
    user: "postgres",
    password: "God child@123",
    host: "localhost",
    port: 5432,
    database:"subscribe"
}

//process.env.NODE_ENV === 'production'?prodConfig:devConfig
const client = new Pool(prodConfig);

// connect to the database
client.connect();

module.exports = client; // export for other files to usew