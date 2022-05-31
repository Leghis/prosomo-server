const db = require("../connection/db2")

// Example middleware (before & after)
const mutationMiddleware = {
  Mutation: {
    createContact: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments {dataSources: {logs}}
      const result = await resolve(parent, args,context, info)

      context.dataSources.logs.createContactLog(result._id,args)

      // Or change the returned values of resolvers
      return result
    },

    refreshContact: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments
      const result = await resolve(parent, args, context, info)

      context.dataSources.logs.refreshContactLog(args.id, args.contact)
      // Or change the returned values of resolvers
      return result
    },

    deleteContact: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments
      const result = await resolve(parent, args, context, info)

      context.dataSources.logs.deleteContactLog(args.id)

      // Or change the returned values of resolvers
      return result
    },

  },
}

module.exports = mutationMiddleware
