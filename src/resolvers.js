const Contact = require("./models/Contact")
const {connectDB} = require("./connection/db")
connectDB()

const resolvers = {
    Query:{
        getAllContact:async ()=>{
            const contact = await Contact.find();
            return contact;
        },
        getContact:async (_,args)=>{
            const contact = await Contact.findById(args.id)
            return contact
        }
    },
    Mutation:{
        createContact : async (_,args)=>{
            const {
                surname ,name , email, phone , town , region ,box ,country ,comment1 ,comment2
            } = args.contact;
            const newContact = new Contact({  surname ,name , email, phone , town , region ,box ,country ,comment1 ,comment2  });

            await newContact.save();
            return newContact
        },
        deleteContact:async (_,{id})=>{
            await Contact.findByIdAndDelete(id);
            return 'Deleted user'
        },
        refreshContact:async (_,{contact,id})=>{
            const actu = await Contact.findByIdAndUpdate(id,{$set:contact},{new:true})

            return actu
        }
    }
}

module.exports = {resolvers}