const sendResponse = (res, statusCode, message, data = null, token = '') => {
  res.status(200).json({ code: statusCode, message, data,  token: token ? token : res.locals.token });
};

module.exports = sendResponse;