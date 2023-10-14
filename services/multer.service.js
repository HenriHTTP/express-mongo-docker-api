const multer = require('multer');

const storage = multer.memoryStorage();
const imageUpload = multer({
  storage: storage,
});
module.exports = { imageUpload };
