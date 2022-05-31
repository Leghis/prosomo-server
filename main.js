const {ApolloServer} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {typeDefs} = require('./src/typeDefs')
const {resolvers} = require('./src/resolvers')
const ContactsDataSources = require("./src/DataSources/ContactsDataSources")
const RelationsDataSources = require("./src/DataSources/RelationsDataSources")
const db = require("./src/connection/db2")
const {applyMiddleware} = require("graphql-middleware")
const Middleware = require('./src/middleware/index')
const DataLoader = require("dataloader");
const {ObjectID} = require("mongodb");


//adapter le schema et le resolver
const schema = makeExecutableSchema({typeDefs, resolvers})

//configure the middleware and the schema
const schemaWithMiddleware = applyMiddleware(schema, ...Middleware)

const server = new ApolloServer(
  {
    schema: schemaWithMiddleware,
    csrfPrevention: true,
    dataSources: () => ({
      contacts: new ContactsDataSources(db.collection('mescontacts')),
      relations: new RelationsDataSources(db.collection('relations'))
    }),
    context: async () => {
      return {
        dataloaders: {
          getDefaultContact: new DataLoader( async (key) => {
            let data = []
            key.map( (element) => {
              data.push( db.collection("relations")
                .findOne({contactID: element, default: true}))
            })
            return Promise.all(data);
          })
        }
      }
    }
  }
);


// The `listen` method launches a web server.
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
