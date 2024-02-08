require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Setting cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
});

cloudinaryUpload = (file) => 
    cloudinary.uploader.upload(file, {
        upload_preset: process.env.UPLOAD_PRESET,
});

// Get images from folder using cloudinary Search API
getImages = async (next_cursor) => {
    const resources = await cloudinary.search
    .expression(`folder:${process.env.UPLOAD_FOLDER}`)
    .max_results(20)
    .sort_by("uploaded_at", "desc")
    .next_cursor(next_cursor)
    .execute();
    return resources;
}

module.exports = {
    cloudinaryUpload,
    getImages,
};