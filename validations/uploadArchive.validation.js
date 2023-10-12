function uploadArchiveValidation(err, req, res, next) {
  try {
    if (err) {
      res.status(500).json({ errordata: `${err}` });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = uploadArchiveValidation;
