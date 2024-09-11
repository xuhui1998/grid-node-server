const jwt = require('jsonwebtoken');
const sendResponse = require('../../utils')

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer', '');

  if (!token) {
    return sendResponse(res, 403, '暂无权限')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { user } = decoded;
    req.user = { id: user.id };
    next();
  } catch (err) {
    return sendResponse(res, 401, '登录状态已过期，请重新登录')
  }
};

module.exports = auth;