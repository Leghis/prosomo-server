const db = require("../connection/db2")

//Définir la collection relative aux logs
let logsCollection = db.collection('logs')


// Example middleware (before & after)
const mutationMiddleware = {
  Mutation: {
    createContact: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments
      const result = await resolve(parent, args, context, info)
      //Ajouter des informations dans les logs lors de l'ajout d'un contact
      //Type -- Le type d'operation
      //operation -- ex:createContact
      //args -- ensemble de données enregistrées
      //date -- date relative a l'enregistrement
      await logsCollection.insertOne(
        {
          type: "Mutation",
          operation: "createContact",
          idContact: result._id,
          args: args,
          date: new Date()
        }
      )
      // Or change the returned values of resolvers
      return result
    },

    refreshContact: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments
      const result = await resolve(parent, args, context, info)
      //Ajouter des informations dans les logs lors de de la modification d'un contact
      //Type -- Le type d'operation
      //operation -- ex:createContact
      //idContact -- id de l'élément modifier
      //date -- date relative a l'enregistrement
      await logsCollection.insertOne(
        {
          type: "Mutation",
          operation: "refreshContact",
          idContact: args.id,
          elementmodify: args.contact,
          date: new Date()
        }
      )

      // Or change the returned values of resolvers
      return result
    },

    deleteContact: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments
      const result = await resolve(parent, args, context, info)
      //Ajouter des informations dans les logs lors de de la modification d'un contact
      //Type -- Le type d'operation
      //operation -- ex:createContact
      //idContact -- id de l'élément modifier
      //date -- date relative a l'enregistrement
      await logsCollection.insertOne(
        {
          type: "Mutation",
          operation: "deleteContact",
          idContact: args.id,
          elementmodify: "All Contact and Relation",
          date: new Date()
        }
      )

      // Or change the returned values of resolvers
      return result
    },

  },
}

module.exports = mutationMiddleware
