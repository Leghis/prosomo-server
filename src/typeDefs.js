const {gql} = require("apollo-server")

const typeDefs = gql`

  type Contact{
    _id: ID
    surname: String
    name: String
    email: String
    phone: String
    town: String
    region: String
    box: String
    country: String
    comment1: String
    comment2: String
  }

  type Query{
    getAllContact: [Contact]
    getContact(id:ID): Contact
  }

  input ContactInput {
    surname: String
    name: String
    email: String
    phone: String
    town: String
    region: String
    box: String
    country: String
    comment1: String
    comment2: String
  }

  type Mutation{
    createContact(contact: ContactInput!): Contact

    deleteContact(id: ID!): String
    refreshContact(id: ID!,contact: ContactInput):Contact
  }
`

module.exports = {typeDefs}
