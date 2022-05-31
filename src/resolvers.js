const resolvers = {
  Query: {
    //Fonction relative au contact
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
    },

  //  Fonction relative au relation
    //function to retrieve all contacts
    getAllRelation: async (_, args, {dataSources: {relations}}) => {
      return relations.getAllRelation(args.contactID)
    },

    //function to retrieve a relation
    getRelation: async (_, args, {dataSources: {relations}}) => {
      return relations.getRelation(args.id)
    },
  },
  Contact: {
    _id(parent) {
      return parent._id
    },
    surname(parent) {
      return parent.surname
    },
    DefaultRelation(parent, args, {dataloaders}, info){
      return dataloaders.getDefaultContact.load(info.variableValues.getContactId??parent._id.toString());  // root of Book is Author
    },
    // author: async (root, args, context, info) => {
    //   return context.authorLoader.load(root.id);  // root of Book is Author
    // }
    name(parent) {
      return parent.name
    },
    email(parent) {
      return parent.email
    },
    phone(parent) {
      return parent.phone
    },
    town(parent) {
      return parent.town
    },
    region(parent) {
      return parent.region
    },
    box(parent) {
      return parent.box
    },
    country(parent) {
      return parent.country
    },
    comment1(parent) {
      return parent.comment1
    },
    comment2(parent) {
      return parent.comment2
    },
  },
  Mutation: {
    // Fonction relative aux contact
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
    },


    // Fonction relative aux relations
    //function to create a relation
    createRelation: async (_, args, {dataSources: {relations}}) => {
      return relations.createRelation(args)
    },

    //function to update a contact
    refreshRelation: async (_, {relation, id}, {dataSources: {relations}}) => {
      return relations.refreshRelation(id, relation)
    },

    //function to delete a contact
    deleteRelation: async (_, {id}, {dataSources: {relations}}) => {
      return relations.deleteRelation(id)
    },
  }
}

module.exports = {resolvers}
