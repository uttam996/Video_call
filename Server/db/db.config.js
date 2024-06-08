
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb =async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");

    
  } catch (error) {
    console.log(error);
    
  }

};

module.exports = connectDb;