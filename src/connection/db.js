const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        await connect('mongodb+srv://admin:admin@realmcluster.dbjpu.mongodb.net/contact');
        console.log('successfull connected to the bd')

    } catch (error) {
        console.error(error);

    }
};

module.exports = {connectDB}