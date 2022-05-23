const {MongoDataSource} = require('apollo-datasource-mongodb')
const {v4: uuidv4} = require("uuid");

class ContactsDataSources extends MongoDataSource {
  getAllContact() {
    return this.findByFields({})
  }

  getContact(id) {
    return this.findOneById(id)
  }

  createContact(args) {
    const {surname, name, email, phone, town, region, box, country, comment1, comment2} = args.contact;
    const contact = {
      _id: uuidv4(),
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

  deleteContact(id){
    this.collection.findOneAndDelete({_id:id})
    return 'Deleted Contact'
  }
}

module.exports = ContactsDataSources
