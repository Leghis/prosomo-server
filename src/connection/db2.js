const {MongoClient} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'contact';
client.connect()
const db = client.db(dbName);
// const contactCollection = db.collection('contacts')
console.log('Connected successfully to server mongodb officiel driver');


module.exports = db