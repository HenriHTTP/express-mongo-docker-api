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

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos.'));
    }
  },
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
});
module.exports = { imageUpload };
