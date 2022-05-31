const {ApolloServer} = require('apollo-server')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {typeDefs} = require('./src/typeDefs')
const {resolvers} = require('./src/resolvers')
const ContactsDataSources = require("./src/DataSources/ContactsDataSources")
const RelationsDataSources = require("./src/DataSources/RelationsDataSources")
const LogsDataSources = require("./src/DataSources/LogsDataSources")

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
      relations: new RelationsDataSources(db.collection('relations')),
      logs: new LogsDataSources(db.collection("logs"))
    }),
    context: async () => {
      return {
        dataloaders: {
          getDefaultContact: new DataLoader( async (keys) => {
            // const results = await db.fetchAllKeys(keys)
            // return keys.map(key => results[key] || new Error(`No result for ${key}`))
            const results = await db.collection("relations").find({contactID:{$in:keys}, default: true}).toArray()
            return keys.map((key,index) =>{
              if(results[index] && key === results[index].contactID){
                return results[index]
              }
            })|| new Error(`No result for ${key}`)
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
