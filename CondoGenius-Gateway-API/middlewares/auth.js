const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
  const token = req.header('x-access-token');

  if (req.url === '/gateway/login' || req.url === '/gateway/user/register' || req.url === '/gateway/user/me' || req.url === '/gateway/logout') {
    return next();
  }

  if (!token) {
    return res.status(401).json({ msg: 'Sem Token. Autorização negada!' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);

    req.user_id = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Este Token não é valido!', err: err.message });
  }
}

module.exports = authMiddleware;
