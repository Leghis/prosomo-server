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

    //filtre par region
    filterRegion: async (_, {region}, {dataSources: {contacts}}) => {
      return contacts.filterRegion(region)
    },

    //filtre par code postal
    filterBox: async (_, {box}, {dataSources: {contacts}}) => {
      return contacts.filterBox(box)
    },

    //récupérer les régions
    getRegions: async (_, __, {dataSources: {contacts}}) => {
      return contacts.getRegions()
    },

    //récupérer les box
    getBox: async (_, __, {dataSources: {contacts}}) => {
      return contacts.getBox()
    }

  },
  Contact:{
    surname(parent){
      return  parent.surname
    }
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
