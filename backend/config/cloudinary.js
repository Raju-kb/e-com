import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


const uploadOnCloudinary = async (filePath) => {
    // Log configuration (without exposing secrets)
    console.log("Cloudinary Config Check:", {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ Missing",
        api_key: process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing",
        api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing"
    });

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    try {
        if(!filePath){
            console.error("❌ No file path provided to uploadOnCloudinary")
            return null
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error("❌ File does not exist:", filePath)
            return null
        }

        console.log("📤 Uploading file:", filePath)
        const uploadResult = await cloudinary.uploader.upload(filePath)
        
        // Delete local file after successful upload
        fs.unlinkSync(filePath)
        console.log("✅ File uploaded successfully:", uploadResult.secure_url)
        return uploadResult.secure_url
        
    } catch (error) {
        console.error("❌ Cloudinary upload error:")
        console.error("   Error Message:", error.message)
        console.error("   Error Code:", error.error?.code || error.http_code)
        console.error("   Full Error:", error)
        
        // Delete local file even if upload fails
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        return null
    }
    
}
export default uploadOnCloudinary