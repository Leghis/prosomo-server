const db = require("./connection/db2")
const {v4: uuidv4} = require('uuid');

const contactCollection = db.collection('mescontacts')
const resolvers = {
  Query: {
    getAllContact: async (_, __, {dataSources: {contacts}}) => {
      return contacts.getAllContact()
    },
    getContact: async (_, __, {dataSources: {contacts}}) => {
      return contacts.getContact(__.id)
    }
  },
  Mutation: {
    createContact: async (_, args, {dataSources: {contacts}}) => {
      return contacts.createContact(args)

    },
    deleteContact: async (_, {id},{dataSources: {contacts}}) => {
      // await contactCollection.findOneAndDelete({id: id})
      return contacts.deleteContact(id)
    },
    refreshContact: async (_, {contact, id}) => {

      const actu = await contactCollection.findOneAndUpdate({id: id}, {$set: contact})

      return actu
    }
  }
}

module.exports = {resolvers}
