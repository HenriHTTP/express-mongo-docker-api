const multer = require('multer');
const path = require('path');
const uploadStore = path.resolve(__dirname, '../upload');

const memostorage = multer.memoryStorage();

const imageUpload = multer({
  storage: memostorage,
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
