# 🚨 Error Reference Guide - Quick Lookup

## Frontend Errors (Browser Console)

### ❌ "Please select at least one size"
- **Location:** Browser toast notification
- **Cause:** No size (S, M, L, XL, XXL) was selected
- **Fix:** Click on at least one size button before submitting

### ❌ "Please upload all 4 images"
- **Location:** Browser toast notification
- **Cause:** Less than 4 images were selected
- **Fix:** Upload all 4 product images in the form

### ❌ "Add Product Failed. Please try again."
- **Location:** Browser toast notification
- **Cause:** Generic server error
- **Fix:** Check backend console for detailed error message

---

## Backend Errors (Server Console)

### ❌ "All fields are required"
- **HTTP Status:** 400 Bad Request
- **Cause:** Missing required fields (name, description, price, category, subCategory, sizes)
- **Check:** Ensure form is submitting all fields
- **Fix:** Verify frontend is sending all data in FormData

### ❌ "All 4 images are required"
- **HTTP Status:** 400 Bad Request
- **Cause:** `req.files` doesn't contain all 4 images
- **Possible Reasons:**
  - Frontend didn't upload all images
  - Multer middleware failed to process files
  - File size too large
- **Check:**
  1. Verify all 4 images are selected in frontend
  2. Check file sizes (should be reasonable)
  3. Check `backend/public/` directory exists

### ❌ "Failed to upload images to Cloudinary"
- **HTTP Status:** 500 Internal Server Error
- **Cause:** Cloudinary upload returned `null` or `undefined`
- **Possible Reasons:**
  - Invalid Cloudinary credentials
  - Network connection issue
  - Cloudinary API rate limit
  - File format not supported
- **Check Backend Console For:**
  - "Cloudinary upload error: [specific message]"
- **Fix:**
  1. Verify `.env` has correct Cloudinary credentials:
     ```env
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
  2. Test Cloudinary credentials independently
  3. Check internet connection
  4. Verify image file format (JPG, PNG, etc.)

### ❌ "No file path provided to uploadOnCloudinary"
- **Location:** Server console log
- **Cause:** File path is undefined or null
- **Possible Reasons:**
  - Multer failed to save file
  - `public` directory doesn't exist
  - File permissions issue
- **Fix:**
  1. Ensure `backend/public/` directory exists
  2. Check directory permissions: `chmod 755 backend/public`
  3. Verify multer configuration in `middleware/multer.js`

### ❌ "Cloudinary upload error: [specific error]"
- **Location:** Server console log
- **Common Errors:**

#### "Invalid API Key"
- **Fix:** Copy correct API Key from Cloudinary Dashboard

#### "Invalid signature"
- **Fix:** 
  1. Verify API Secret is correct
  2. Ensure no extra spaces in `.env` values
  3. Restart server after updating `.env`

#### "Upload preset not found"
- **Fix:** Remove upload preset from config (not needed for authenticated uploads)

#### "File size too large"
- **Fix:** Compress images or increase Cloudinary upload limits

### ❌ "AddProduct error: [error message]"
- **HTTP Status:** 500 Internal Server Error
- **Cause:** General error caught by try-catch
- **Common Scenarios:**

#### "Cannot read property 'path' of undefined"
- **Cause:** `req.files.image1[0]` is undefined
- **Fix:** Ensure all 4 images are being uploaded

#### "Unexpected field"
- **Cause:** Multer received field name it wasn't expecting
- **Fix:** Verify FormData field names match: `image1`, `image2`, `image3`, `image4`

#### "JSON.parse error"
- **Cause:** `sizes` field isn't valid JSON
- **Fix:** Ensure frontend sends: `JSON.stringify(sizes)`

#### "Validation error"
- **Cause:** MongoDB schema validation failed
- **Check:** Product model schema requirements
- **Fix:** Ensure all required fields have valid values

---

## Network Errors

### ❌ "Failed to load resource: net::ERR_CONNECTION_REFUSED"
- **Cause:** Backend server is not running
- **Fix:** Start backend server: `cd backend && npm start`

### ❌ "Failed to load resource: the server responded with a status of 500"
- **Cause:** Server encountered an error (check backend console)
- **Fix:** Look at backend console for specific error message

### ❌ "CORS Error"
- **Cause:** Frontend URL not in CORS whitelist
- **Check:** `backend/index.js` CORS configuration
- **Fix:** Add your frontend URL to the origin array:
  ```javascript
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", ...],
    credentials: true
  })
  ```

---

## Database Errors

### ❌ "MongoServerError: bad auth"
- **Cause:** MongoDB credentials are incorrect
- **Fix:**
  1. Verify username and password in MongoDB Atlas
  2. Update `MONGODB_URL` in `.env`
  3. Ensure password doesn't contain special characters (encode if needed)

### ❌ "MongoServerError: connection timeout"
- **Cause:** IP not whitelisted in MongoDB Atlas
- **Fix:**
  1. Go to MongoDB Atlas → Network Access
  2. Add your IP address or use `0.0.0.0/0` for all IPs (development only)

### ❌ "Validation failed for path 'price'"
- **Cause:** Price is not a valid number
- **Fix:** Ensure frontend sends numeric price value

---

## Success Indicators ✅

When everything works correctly, you'll see:

### Backend Console:
```
Uploading images to Cloudinary...
Uploading file: ./public/image1.jpg
File uploaded successfully: https://res.cloudinary.com/...
Uploading file: ./public/image2.jpg
File uploaded successfully: https://res.cloudinary.com/...
Uploading file: ./public/image3.jpg
File uploaded successfully: https://res.cloudinary.com/...
Uploading file: ./public/image4.jpg
File uploaded successfully: https://res.cloudinary.com/...
Images uploaded successfully
Product created successfully: 507f1f77bcf86cd799439011
```

### Frontend:
- Toast notification: "Product Added Successfully"
- Form resets to default values
- Loading spinner disappears

---

## Debugging Checklist

When you encounter an error:

1. ✅ **Check Frontend Console** (Browser DevTools)
   - Look for toast notification message
   - Check Network tab for failed requests
   - Look for JavaScript errors

2. ✅ **Check Backend Console** (Terminal)
   - Look for detailed error logs
   - Check which step failed
   - Note the specific error message

3. ✅ **Verify Configuration**
   - `.env` file has all required variables
   - Backend server is running
   - Database is connected
   - Cloudinary credentials are correct

4. ✅ **Check File System**
   - `backend/public/` directory exists
   - Directory has write permissions
   - Enough disk space available

5. ✅ **Test Individual Components**
   - Test Cloudinary upload separately
   - Test database connection separately
   - Test file upload with multer separately

---

## Emergency Fixes

### Quick Fix: Clear Everything and Restart
```bash
# Stop backend server (Ctrl+C)

# Clear public folder
cd backend/public
rm -rf *  # or manually delete all files

# Restart backend
cd ..
npm start
```

### Quick Fix: Reset Form State
In browser console:
```javascript
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### Quick Fix: Test Cloudinary Credentials
Create `backend/test-cloudinary.js`:
```javascript
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload('test-image.jpg');
    console.log('✅ Cloudinary working!', result.secure_url);
  } catch (error) {
    console.error('❌ Cloudinary error:', error.message);
  }
}

testUpload();
```

Run: `node backend/test-cloudinary.js`

---

## Still Stuck?

1. Read `backend/TROUBLESHOOTING.md` for detailed guides
2. Check `FIXES_SUMMARY.md` for what was changed
3. Verify all environment variables are set correctly
4. Restart backend server after any configuration changes
5. Clear browser cache and reload frontend
6. Check that all dependencies are installed: `npm install`

---

**Last Updated:** After fixing 500 Internal Server Error  
**Related Files:** 
- `backend/controller/productController.js`
- `backend/config/cloudinary.js`
- `admin/src/pages/Add.jsx`


