const resolvers = {
  Query: {
    //function to retrieve all contacts
    getAllContact: async (_, args, {dataSources: {contacts}}) => {
      return contacts.getAllContact(args)
    },
    //function to retrieve a contact
    getContact: async (_, args, {dataSources: {contacts}}) => {
      return contacts.getContact(args.id)
    },
  },
  Mutation: {
    //function to create a contact
    createContact: async (_, args, {dataSources: {contacts}}) => {
      return contacts.createContact(args)
    },
    //function to delete a contact
    deleteContact: async (_, {id}, {dataSources: {contacts}}) => {
      return contacts.deleteContact(id)
    },
    //function to update a contact
    refreshContact: async (_, {contact, id}, {dataSources: {contacts}}) => {
      return contacts.refreshContact(id, contact)
    }
  }
}

module.exports = {resolvers}
