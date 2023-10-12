const fileType = require('file-type');

async function isValidImage(req) {
  const buffer = req.file.buffer;
  const file = await fileType.fromBuffer(buffer);
  const isImage = file.mime.startsWith('image/');

  if (!isImage) {
    return false;
  }

  return true;
}

module.exports = isValidImage;
