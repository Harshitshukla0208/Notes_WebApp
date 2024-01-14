const mongoose = require('mongoose');
mongoose.set('strictQuery', false) //removes unwanted warnings inside terminal

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGOat_URI);
        console.log(`DB connected: ${conn.connection.host}`)    
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;