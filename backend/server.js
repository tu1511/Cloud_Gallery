require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { cloudinaryUpload, getImages } = require("./services/cloudinaryServices");

const { formatBuffer } = require("./services/datauriServices");
const { singleUploadCtrl } = require("./services/multerServices");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// Use memoryStorage for multer upload

// use datauri to stream buffer

// Get Images API
app.get("/api/photos", async(req, res)=> {
    const respose = await getImages(req.query.next_cursor || "");
    const results = {
        images: [],
        next_cursor: null,
    };

    respose.resources.forEach(item => {
        results.images.push({
            public_id: item.public_id,
            created_at: item.created_at,
            secure_url: item.secure_url
        });
    });
    if(respose.next_cursor) {
        results.next_cursor = respose.next_cursor;
    }

    return res.json({
        results,
    })
})

// Upload API
app.post("/api/upload", singleUploadCtrl, async (req, res)=> {
    const uploadFile = req.body.file || req.file;
    try {
        if(!uploadFile) {
            return res.status(422).send({
                message: "There is error when uploading",
            });
        }
        let uploadResult;
        if(!uploadFile.buffer) {
            uploadResult = await cloudinaryUpload(uploadFile);
        } else {
            const file64 = formatBuffer(req.file);
            uploadResult = await cloudinaryUpload(file64.content);
        }

        // convert stream to base64 format
        return res.json({
            cloudinaryID: uploadResult.public_id,
            url: uploadResult.secure_url,
            message: "Upload OK!",
        });
    } catch (error) {
        return res.status(422).send({
            message: error.message,
        });
    }
});

const port = 3002;

app.get('/api', (req, res)=> {
    console.log("Hello!");
})
app.listen(port, () =>{
    console.log("Port is running on: ", port);
});