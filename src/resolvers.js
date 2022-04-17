const db = require("./connection/db2")
const { v4: uuidv4 } = require('uuid');

const contactCollection = db.collection('mescontacts')
const resolvers = {
    Query:{
        getAllContact:async ()=>{
            const contact = (await contactCollection).find({}).toArray();
            return contact;
        },
        getContact:async (_,args)=>{
            const contact = await contactCollection.findOne({id:args.id})
            return contact
        }
    },
    Mutation:{
        createContact : async (_,args)=>{
            const randomID = uuidv4()
            const {
                surname ,name , email, phone , town , region ,box ,country ,comment1 ,comment2
            } = args.contact;
            let Customcomment1 = comment1?comment1:""
            let Customcomment2 = comment2?comment2:""

            const create = await contactCollection.insertOne({
                id: randomID,
                surname,
                name,
                email,
                phone,
                town,
                region,
                box,
                country,
                comment1:Customcomment1,
                comment2:Customcomment2
            })

            return create

        },
        deleteContact:async (_,{id})=>{
            await contactCollection.findOneAndDelete({id: id})
            return 'Deleted user'
        },
        refreshContact:async (_,{contact,id})=>{

            const actu = await contactCollection.findOneAndUpdate({id:id},{$set:contact})

            return actu
        }
    }
}

module.exports = {resolvers}