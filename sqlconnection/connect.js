const { Client } = require('pg');

// user: "postgres",
// password: "God child@123",
// host: "localhost",
// port: 5432,
// database:"subscribe"

//Client configuration
const client = new Client(process.env.DATABASE_URL);

// connect to the database
client.connect();

module.exports = client; // export for other files to usew