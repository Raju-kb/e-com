import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }
        
        // Debug: Show connection URL (mask password)
        const urlForLog = process.env.MONGODB_URL.replace(/:([^:@]{1,})@/, ':****@');
        console.log("🔗 Attempting to connect to:", urlForLog);
        
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
        
        // Specific error handling
        if (error.message.includes("bad auth") || error.message.includes("Authentication failed")) {
            console.error("🔐 Authentication Error: Username or password is incorrect");
            console.error("💡 Check your MongoDB Atlas credentials:");
            console.error("   - Database username is correct");
            console.error("   - Database password is correct (no extra spaces)");
            console.error("   - Database user has been created in MongoDB Atlas");
        } else if (error.message.includes("IP") || error.message.includes("whitelist")) {
            console.error("🌐 IP Whitelist Error: Your IP is not whitelisted");
            console.error("💡 Add your IP (103.171.116.138) to MongoDB Atlas Network Access");
        }
        
        console.error("Full error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDb;