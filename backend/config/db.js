const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://7juned7:teacheasy123@cluster0.vsgjyor.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,



        });
        console.log(`MongoDB connected ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error kya hai ${error.message}`);
        process.exit();
    }
}
module.exports = connectDB;