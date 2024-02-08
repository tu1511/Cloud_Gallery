const DatauriParser = require('datauri/parser');
const path = require("path");
const parser = new DatauriParser();

exports.formatBuffer = (file) => {
    return parser.format(
        path.extname(file.originalname).toString().toLowerCase(),
        file.buffer
    );
};