const airtable = require('airtable');
airtable.configure({endpointUrl: 'https://api.airtable.com',apiKey:'keyAXFkkpkyOYWSWu'})
const base = airtable.base('appJG4aQ7DudeY2J9');

module.exports = { base };