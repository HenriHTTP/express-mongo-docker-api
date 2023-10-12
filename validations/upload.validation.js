const isImage = require('../helpers/uploads/isvalidImage');
const errorUpload = require('../error/errorUpload');

async function uploadValidation(req, res, next) {
  try {
    if (!req.file) {
      res.status(500).json(errorUpload.arquiveNotFound());
      return;
    }

    const isvalidImage = await isImage(req);
    if (!isvalidImage) {
      res.status(500).json(errorUpload.invalidImage());
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
}

module.exports = uploadValidation;
