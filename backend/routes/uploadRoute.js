const express = require("express");
const multer = require("multer");
const { uploadPdfFile } = require("../controllers/uploadController");
const {sendTweetToUsers} = require("../controllers/twittercontroller")

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Define the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save with the original name
  }
});

const upload = multer({ storage });

// Define the POST route to handle PDF uploads
router.post("/upload", upload.single("pdfFile"), uploadPdfFile);
router.post('/send-tweets', sendTweetToUsers);

module.exports = router;

