const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.uploadPdfFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    // Read the PDF file from disk
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF
    const data = await pdfParse(dataBuffer);
    const extractedText = data.text;

    // Extract Twitter URLs from the PDF text using a regex pattern
    const twitterUrlRegex = /https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+/g;
    const twitterAccounts = extractedText.match(twitterUrlRegex) || []; // Match Twitter URLs or return empty array

    // Respond with the extracted Twitter accounts
    res.json({
      success: true,
      message: "PDF uploaded and parsed successfully",
      twitterAccounts: twitterAccounts,
    });

    // Optionally, delete the file after processing
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error processing the PDF file" });
  }
};
;

