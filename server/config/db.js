const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ye line database se connection banati hai
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Agar error aaye to process band kar do
    }
};

module.exports = connectDB;