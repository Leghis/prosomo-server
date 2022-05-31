const {MongoDataSource} = require('apollo-datasource-mongodb')
const {ObjectId} = require("mongodb");

const SECOND = 60

class RelationsDataSources extends MongoDataSource {

  async getAllRelation(contactID) {
    this.dataArray = await this.collection.find({contactID:contactID}).toArray()
    return this.dataArray
  }

  getRelation(id) {
    return this.findOneById(id, {ttl: SECOND})
  }

  createRelation(args) {
    const {contactID ,surname, name, email, phone, town, region, box, country, comment1, comment2} = args.relation;
    const relation = {
      contactID,
      surname,
      name,
      email,
      phone,
      town,
      region,
      box,
      country,
      comment1: comment1 ? comment1 : "",
      comment2: comment2 ? comment2 : ""
    }
    this.collection.insertOne(relation)
    return relation
  }

  refreshRelation(id, relation) {
    this.collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: relation})
    return relation
  }

  deleteRelation(id) {
    this.collection.findOneAndDelete({_id: ObjectId(id)})
    return 'Deleted Contact'
  }
}

module.exports = RelationsDataSources
