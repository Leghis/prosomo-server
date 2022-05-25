const {MongoDataSource} = require('apollo-datasource-mongodb')
const {v4: uuidv4} = require("uuid");

const SECOND = 60

class ContactsDataSources extends MongoDataSource {

   async getAllContact(args) {
    console.log(args)
    this.dataArray = await this.collection.aggregate([
      {
        $group: {
          _id: "1",
          data: {$push: "$$ROOT"},

        }
      },
      {
        $project: {
          _id: 0,
          count: {$size: "$data"},
          data: {
            $slice: ["$data", args.page === 0 ? 0 : args.perPage * (args.page), args.perPage ? args.perPage : 5]
          },
        }
      }
    ]).toArray()
    return this.dataArray[0]
  }

  getContact(id) {
    return this.findOneById(id, {ttl: SECOND})
  }


  createContact(args) {
    let id = uuidv4()
    const {surname, name, email, phone, town, region, box, country, comment1, comment2} = args.contact;
    const contact = {
      _id: id,
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
    this.collection.insertOne(contact)
    return contact
  }

  deleteContact(id) {
    this.collection.findOneAndDelete({_id: id})
    return 'Deleted Contact'
  }

   refreshContact(id, contact) {
    this.collection.findOneAndUpdate({_id: id}, {$set: contact})
    return contact
  }
}

module.exports = ContactsDataSources
