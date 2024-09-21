const sendResponse = require('../../../utils')
const connection = require('../../config/dbConfig')
const axios = require('axios');

const thirdPartyWeatherApiUrl = 'https://api.vvhan.com/api/weather';
// 获取天气
exports.getWeather = async (req, res) => {
  const { city } = req.body;
  try {
    const response = await axios.get(`${thirdPartyWeatherApiUrl}?city=${city}`);
    return sendResponse(res, 200, '请求成功', response.data);
  } catch (error) {
    return sendResponse(res, 500, '服务器错误');
  }
}