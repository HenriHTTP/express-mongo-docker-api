const isImage = require('../../helpers/uploads/isvalidImage');
const errorUpload = require('../../error/errorUpload');

async function isValidImageUpload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(500).json(errorUpload.arquiveNotFound());
    }

    const isvalidImage = await isImage(req);
    if (!isvalidImage) {
      return res.status(500).json(errorUpload.invalidImage());
    }
    next();
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
}

module.exports = isValidImageUpload;
