const sendResponse = require('../../utils')
const connection = require('../config/dbConfig')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  
  // 检查请求参数是否存在
  if (!username || !password) {
    return sendResponse(res, 400, '用户名或密码不能为空')
  }

  try {
    // 检查用户是否已经存在
    connection.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
      if (err) {
        return sendResponse(res, 500, '服务器错误');
      }
      if (results.length > 0) {
        return sendResponse(res, 400, '用户已存在')
      }

      // 哈希密码
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 插入新用户到数据库
      connection.query('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) {
        return sendResponse(res, 500, '服务器错误');
      }
        return sendResponse(res, 200, '用户注册成功')
      });
    });
  } catch (err) {
    console.error(err.message);
    return sendResponse(res, 500, '服务器错误')
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 检查请求参数是否存在
  if (!username || !password) {
    return sendResponse(res, 400, '用户名或密码不能为空')
  }

  try {
    // 检查用户是否存在
    connection.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
      if (err) {
        return sendResponse(res, 500, '服务器错误');
      }
      if (results.length === 0) {
        return sendResponse(res, 400, '用户不存在')
      }

      const user = results[0];

      // 验证密码
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return sendResponse(res, 400, '账号或密码错误')
      }

      // 生成 JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            return sendResponse(res, 500, '服务器错误');
          }
          sendResponse(res, 200, '登录成功', { token }, token)
        }
      );
    });
  } catch (err) {
    console.error(err.message);
    return sendResponse(res, 500, '服务器错误')
  }
}

exports.userInfo = async (req, res) => {
  try {
    // 从请求的 JWT 中获取用户 ID
    const userId = req.user.id;

    // 根据用户id查询数据库获取用户信息
    const query = 'SELECT id, name, avatar, role_id, role_name FROM users WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
      if (err) {
        return sendResponse(res, 500, '服务器错误');
      }

      if (results.length === 0) {
        return sendResponse(res, 404, '用户未找到');
      }
      // 返回用户信息
      sendResponse(res, 200, 'success', results[0]);
    });
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, '服务器错误');
  }
}
