import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises API

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    // Upload with quality adjustment and format optimization
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      quality: "auto:best",
      fetch_format: "auto",
    });

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  } finally {
    //  attempt cleanup
    if (localFilePath) {
      await fs.unlink(localFilePath).catch(error => {
        console.error("File cleanup error:", error);
      });
    }
  }
};

export { uploadOnCloudinary };