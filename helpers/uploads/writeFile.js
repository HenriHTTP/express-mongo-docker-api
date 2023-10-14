const fs = require('fs');

async function writeFile(filePath, buffer) {
  fs.writeFileSync(filePath, buffer);
  return true;
}
module.exports = writeFile;
