// config multer for uploads
const multer = require('multer');
const path = require('path');
const uploadStore = path.resolve(__dirname, '../upload');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadStore);
  },
  filename: (req, file, callback) => {
    const timeUploadArquive = new Date().getTime();
    const arquiveName = file.originalname;
    callback(null, `${timeUploadArquive}_${arquiveName}`);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };
