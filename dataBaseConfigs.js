const mongoose = require('mongoose');
require('dotenv').config();

async function connectDb() {
    try {
        console.log('Connection with DB initialized.');

        await mongoose.connect(process.env.MONGO_URL);

        console.log('DB connection successful.')
    } catch(error) {
        console.log(error);
    }
}

module.exports = connectDb;
