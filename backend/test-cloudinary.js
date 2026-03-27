import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

console.log("\n🧪 Testing Cloudinary Configuration...\n");

// Check if environment variables are loaded
console.log("1️⃣ Checking Environment Variables:");
console.log("   CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ MISSING");
console.log("   CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ MISSING");
console.log("   CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ MISSING");

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("\n❌ ERROR: Missing Cloudinary credentials in .env file!\n");
    console.log("📝 Please add to backend/.env:");
    console.log("   CLOUDINARY_CLOUD_NAME=your_cloud_name");
    console.log("   CLOUDINARY_API_KEY=your_api_key");
    console.log("   CLOUDINARY_API_SECRET=your_api_secret\n");
    process.exit(1);
}

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

console.log("\n2️⃣ Testing Cloudinary Connection:");

// Test with a simple API call
async function testCloudinary() {
    try {
        // Try to get usage details (simple API call)
        const result = await cloudinary.api.usage();
        console.log("   ✅ SUCCESS! Cloudinary connection working!");
        console.log("   Account Details:");
        console.log("      Cloud Name:", result.cloud_name || "N/A");
        console.log("      Plan:", result.plan || "N/A");
        
        console.log("\n✅ All tests passed! Your Cloudinary credentials are correct.\n");
        console.log("💡 If you're still having upload issues, it might be:");
        console.log("   - File path problems");
        console.log("   - File format issues");
        console.log("   - Network connectivity");
        console.log("   - Cloudinary account limits\n");
        
    } catch (error) {
        console.error("\n❌ CLOUDINARY TEST FAILED!\n");
        console.error("Error Message:", error?.message || error);
        console.error("Error Code:", error?.error?.code || error?.http_code);
        
        const errorMsg = error?.message || JSON.stringify(error);
        const actualError = error?.error?.message || errorMsg;
        
        if (actualError.includes("cloud_name mismatch")) {
            console.log("\n❌ CLOUD NAME MISMATCH ERROR:");
            console.log("   Your Cloud Name doesn't match your API Key and Secret!");
            console.log("   They are from DIFFERENT Cloudinary accounts.\n");
            console.log("📝 How to fix:");
            console.log("   1. Login to https://cloudinary.com/console");
            console.log("   2. On the Dashboard, find 'API Environment variable':");
            console.log("      cloudinary://API_KEY:API_SECRET@CLOUD_NAME");
            console.log("   3. Copy ALL THREE values from that SAME string");
            console.log("   4. Update backend/.env with ALL THREE:");
            console.log("      CLOUDINARY_CLOUD_NAME=CLOUD_NAME");
            console.log("      CLOUDINARY_API_KEY=API_KEY");
            console.log("      CLOUDINARY_API_SECRET=API_SECRET");
            console.log("   5. Make sure NO extra spaces or quotes");
            console.log("   6. Restart backend server");
            console.log("   7. Run this test again\n");
            console.log("📄 See CLOUDINARY_FIX_GUIDE.md for detailed instructions\n");
        } else if (actualError.includes("Invalid API Key") || error?.http_code === 401 || errorMsg.includes("Invalid API Key")) {
            console.log("\n🔐 AUTHENTICATION ERROR:");
            console.log("   Your API credentials are incorrect.\n");
            console.log("📝 How to fix:");
            console.log("   1. Login to https://cloudinary.com/console");
            console.log("   2. Go to Dashboard > Settings > API Keys");
            console.log("   3. Copy the correct values:");
            console.log("      - Cloud Name");
            console.log("      - API Key");
            console.log("      - API Secret");
            console.log("   4. Update backend/.env file");
            console.log("   5. Restart backend server");
            console.log("   6. Run this test again\n");
        } else if (errorMsg.includes("Could not resolve host")) {
            console.log("\n🌐 NETWORK ERROR:");
            console.log("   Cannot connect to Cloudinary servers.");
            console.log("   Check your internet connection.\n");
        } else {
            console.log("\nFull error details:");
            console.error(error);
        }
        
        process.exit(1);
    }
}

testCloudinary();

