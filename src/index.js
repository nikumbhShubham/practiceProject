// require('dotenv').config({path: './env'});

import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';
dotenv.config({
    path:'./env'
})

//2nd method of connection  to database using Mongoose
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("connection FAILED",err)
})
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