import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { Video } from "./video.model.js";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true, //index for search , it will create a text index on this field in the background. 

        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullname : {
            type: String,
            required: [true, "fullname is required"],
            trim: true,
            index: true,

        },
        avatar: {
            type: String,//cloudnary url{string}
            required: true,

        },
        coverImage: {
            type: String,//cloudnary url{string}

        },
        watchHistory: [{
            type: Schema.Types.ObjectId,
            ref: Video
        }],

        password: {
            type: String,
            required: [true, 'password is required']
        },
        refreshToken: {
            type: String,
        }



    }, { timestamps: true }
)

//password encryption
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
//custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function (password) {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)


