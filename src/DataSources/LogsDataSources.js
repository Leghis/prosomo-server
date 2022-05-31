const {MongoDataSource} = require('apollo-datasource-mongodb')
const {ObjectId} = require("mongodb");

const SECOND = 60

class LogsDataSources extends MongoDataSource {

  createContactLog(id, args) {
    //Ajouter des informations dans les logs lors de l'ajout d'un contact
    //Type -- Le type d'operation
    //operation -- ex:createContact
    //args -- ensemble de données enregistrées
    //date -- date relative a l'enregistrement
    this.collection.insertOne(
      {
        type: "Mutation",
        operation: "createContact",
        idContact: id,
        args: args,
        date: new Date()
      }
    )
  }

  refreshContactLog(id, contact) {
    //Ajouter des informations dans les logs lors de de la modification d'un contact
    //Type -- Le type d'operation
    //operation -- ex:createContact
    //idContact -- id de l'élément modifier
    //date -- date relative a l'enregistrement
    this.collection.insertOne(
      {
        type: "Mutation",
        operation: "refreshContact",
        idContact: id,
        elementmodify: contact,
        date: new Date()
      }
    )
  }

  deleteContactLog(id) {
    //Ajouter des informations dans les logs lors de de la modification d'un contact
    //Type -- Le type d'operation
    //operation -- ex:createContact
    //idContact -- id de l'élément modifier
    //date -- date relative a l'enregistrement
    this.collection.insertOne(
      {
        type: "Mutation",
        operation: "deleteContact",
        idContact: id,
        elementmodify: "All Contact and Relation",
        date: new Date()
      }
    )
  }
}

module.exports = LogsDataSources
