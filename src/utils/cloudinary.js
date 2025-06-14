import {v2 as cloudinary} from "cloudinary";
import { log } from "console";
import { response } from "express";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        //upload File in Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file has been uploaded succesfully
        console.log("file has been uploaded in cloudinary",
            response.url
        );
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the temporary saved temporary file as the operation got failed
        return null;
    }
}

export {uploadOnCloudinary}


