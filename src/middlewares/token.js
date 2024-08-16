const jwt = require('jsonwebtoken');

const userToken = (req, res, next) => {
  const userId = req.user.id;

  // 生成新的 token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // 将 token 添加到响应对象中
  res.locals.token = token; // 使用 res.locals 保存 token
  next();
};

module.exports = userToken;