async function get_token(req) {
  //token req
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];
  return token;
}

module.exports = get_token;
