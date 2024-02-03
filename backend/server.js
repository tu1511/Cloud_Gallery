const express = require("express");
const cors = require("cors");
const multer = require("multer")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// Multer settings
const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"]

// Use memoryStorage for multer upload
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        if(ALLOWED_FORMATS.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Not supported file type"), false);
        }
    },
});

const singleUpload = upload.single("file");
const singleUploadCtrl = (req, res, next) => {
    singleUpload(req, res, (error) => {
        if(error) {
            return res.status(422).send({
                message: "Image upload failed",
            });
        }
        next();
    });
};

// Upload API
app.post("/api/upload", singleUploadCtrl, (req, res)=> {
    
})

const port = 3002;

app.get('/api', (req, res)=> {
    console.log("Hello!");
})
app.listen(port, () =>{
    console.log("Port is running on: ", port);
});