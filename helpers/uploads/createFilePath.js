const path = require('path');

async function createFilePath(arquiveName, directory) {
  const timeUploadArquive = new Date().getTime();
  const upload_directory = directory;
  const filepath = path.join(
    upload_directory,
    `${timeUploadArquive}_${arquiveName}`,
  );
  return filepath;
}
module.exports = createFilePath;
