require('dotenv').config();

const express = require('express'); 
const bodyParser = require('body-parser') 
const connection = require('./src/config/dbConfig');
const { register, login, userInfo } = require('./src/controllers/authControllers.js');
const { getMenus, saveMenu, getMenuListAll } = require('./src/controllers/settings/menuControllers.js');
const { getAdminMenus } = require('./src/controllers/system/adminMenuControllers.js');
const auth = require('./src/middlewares/auth');
const userToken = require('./src/middlewares/token');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

connection.connect(function(err){
    if (err) {      
		console.log('连接数据库出错:' + err);
		connection.end();
		return;
	};
	console.log('数据库连接成功');    
});

// 注册用户
app.post('/grid/auth/register', auth, userToken, register);

// 用户登录
app.post('/grid/auth/login', login);

// 用户信息
app.post('/grid/auth/user', auth, userToken, userInfo);

// 获取菜单
app.post('/grid/settings/menuList', auth, userToken, getMenus);

// 获取所有菜单
app.post('/grid/settings/menuListAll', auth, userToken, getMenuListAll);

// 添加菜单
app.post('/grid/settings/saveMenu', auth, userToken, saveMenu);

// 系统菜单
app.post('/grid/system/adminMenuList', auth, userToken, getAdminMenus);

// 启动服务器
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`));
