const mongoose=require("mongoose");
const  dotenv =require("dotenv");
dotenv.config();



    const Connection=()=> {
    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI);

    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });

    mongoose.connection.on("error", () => {
      console.log("Error while connecting with the database ", error.message);
    });
}

module.exports = Connection;