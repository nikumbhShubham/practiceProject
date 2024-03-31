// require('dotenv').config({path: './env'});

import dotenv from 'dotenv'
import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})

//2nd method of connection  to database using Mongoose
connectDB()
///////////////////////



// 1st METHOD OF CONNECTION
// import express from 'express';
// const app = express()
//     ; (async () => {
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             app.on("error", (error) => {
//                 console.log("error:", error)
//             })

//             app.listen(process.env.PORT, () => { console.log(`Server is running at: , ${process.env.PORT}`) })


//         } catch (error) {
//             console.log("error: ", error)
//             throw error
//         }

//     })()