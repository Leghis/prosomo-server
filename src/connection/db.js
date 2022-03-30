const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/contact');
        console.log('successfull connected to the bd')

    } catch (error) {
        console.error(error);

    }
};

module.exports = {connectDB}