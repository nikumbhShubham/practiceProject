import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload it on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //file  uploaded successfully
        // console.log("file uploaded successfully", response.url)
        fs.unlinkSync(localFilePath);//delete the local file after uploading to cloudinary
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);//delete the file from local system
        return null
    }
}

export {uploadOnCloudnary}




