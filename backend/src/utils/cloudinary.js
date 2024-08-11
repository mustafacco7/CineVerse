import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        
        return response;
    } catch (error) {
        // Remove the locally saved temporary file on error
        fs.unlinkSync(localFilePath);
        return null;
    }
};

// Function to delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;

        // Delete the file from Cloudinary
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto"
        });

        return response;
    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
