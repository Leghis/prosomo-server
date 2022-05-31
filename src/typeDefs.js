const {gql} = require("apollo-server")

const typeDefs = gql`

  type Contact{
    _id: ID
    surname: String
    DefaultRelation:Relation
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

  type Relation{
    _id: ID
    contactID:String
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
    default : Boolean
  }

  type count{
    count : Int
  }

  type data{
    count : Int,
    data : [Contact]
  }

  type filterRegion{
    _id : ID,
    state : String,
    total : Int
  }

  type filterBox{
    _id : ID,
    postalCode : String,
    total : Int
  }

  type Query{
    getAllContact(perPage: Int, page:Int):data
    getAllRelation(contactID:String):[Relation]
    getContact(id:ID): Contact
    getRelation(id:ID): Relation
    getDefaultContact(id:ID):Relation
    filterRegion(region:String):[filterRegion]
    filterBox(box:String):[filterBox]
    getRegions : [String]
    getBox : [String]

  }

  input ContactInput {
    DefaultRelation:String
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
  input RelationInput {
    contactID : String
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
    default:Boolean
  }


  type Mutation{
#    Mutations relatives aux contacts
    createContact(contact: ContactInput!): Contact
    deleteContact(id: ID!): String
    refreshContact(id: ID!,contact: ContactInput):Contact

#    Mutations relatives aux relations
    createRelation(relation: RelationInput!): Relation
    deleteRelation(id: ID!): String
    refreshRelation(id: ID!,relation: RelationInput):Relation

  }
`

module.exports = {typeDefs}
