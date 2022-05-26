const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./src/typeDefs');
const {resolvers} = require('./src/resolvers');
const ContactsDataSources = require("./src/DataSources/ContactsDataSources");
const db = require("./src/connection/db2")


const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    csrfPrevention: true,
    dataSources: () => ({
      contacts: new ContactsDataSources(db.collection('mescontacts'))
    })
  }
);

// The `listen` method launches a web server.
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
