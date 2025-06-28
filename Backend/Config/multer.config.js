// middlewares/multer.js
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  uploadSingle: (fieldName) => upload.single(fieldName),
  uploadFields: (fieldsArray) => upload.fields(fieldsArray),
  rawUpload: upload,
};