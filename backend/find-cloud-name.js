import dotenv from 'dotenv';
dotenv.config();

console.log("\n🔍 Finding Your Correct Cloudinary Cloud Name...\n");

// The API Key tells us which account these credentials belong to
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log("Your API Key:", apiKey);
console.log("\n📋 Here's what you need to do:\n");

console.log("STEP 1: Login to Cloudinary");
console.log("   → Go to: https://cloudinary.com/console");
console.log("   → Login with the account that has API Key:", apiKey);
console.log("");

console.log("STEP 2: Find Your Cloud Name");
console.log("   Once logged in, look at the top of the dashboard.");
console.log("   You'll see a box labeled 'Product Environment Credentials'");
console.log("   or 'API Environment variable' that looks like:");
console.log("");
console.log("   cloudinary://API_KEY:API_SECRET@CLOUD_NAME");
console.log("                                    ^^^^^^^^^^");
console.log("                                    This is your REAL cloud name!");
console.log("");

console.log("STEP 3: Alternative - Check the URL");
console.log("   When you're logged into Cloudinary, look at the browser URL:");
console.log("   https://console.cloudinary.com/console/c-XXXXX/media_library");
console.log("                                              ^^^^^");
console.log("   The part after 'c-' might be your cloud name");
console.log("   OR go to Settings → Account → Cloud name");
console.log("");

console.log("STEP 4: Update Your .env File");
console.log("   Open backend/.env and change this line:");
console.log("");
console.log("   From: CLOUDINARY_CLOUD_NAME=ecom");
console.log("   To:   CLOUDINARY_CLOUD_NAME=YOUR_ACTUAL_CLOUD_NAME");
console.log("");
console.log("   (Replace YOUR_ACTUAL_CLOUD_NAME with what you found)");
console.log("");

console.log("STEP 5: Restart Backend Server");
console.log("   Press Ctrl+C to stop the server");
console.log("   Then run: npm start");
console.log("");

console.log("📝 Common Cloud Names:");
console.log("   - If you just created the account, it might be something like:");
console.log("     • dz0abc123 (random generated)");
console.log("     • your-username");
console.log("     • your-company-name");
console.log("");

console.log("⚠️  IMPORTANT:");
console.log("   The cloud name 'ecom' is INVALID!");
console.log("   You MUST find the correct cloud name that matches");
console.log("   your API Key:", apiKey);
console.log("");


