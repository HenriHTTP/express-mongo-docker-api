async function getFileName(filepath) {
  const removeSpaces = filepath.split('/');
  const fileName = removeSpaces[removeSpaces.length - 1];
  return fileName;
}
module.exports = getFileName;
