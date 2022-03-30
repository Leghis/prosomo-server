const { ApolloServer, gql } = require('apollo-server');


const { connectDB } = require('./src/connection/db');
connectDB()
const {typeDefs} = require('./src/typeDefs');
const {resolvers} = require('./src/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});