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
  type count{
    count : Int
  }

  type data{
    count : Int,
    data : [Contact]
  }

  type Query{
    getAllContact(perPage: Int, page:Int): data
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
