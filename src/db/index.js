import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//2nd method of connection  to database using Mongoose
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1)
    }
}


export  default connectDB; 