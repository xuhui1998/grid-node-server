const sendResponse = require('../../../utils')
const connection = require('../../config/dbConfig')
const dayjs = require('dayjs');

// 获取用户菜单(后期添加权限控制)
exports.getAdminMenus = (req, res) => {
  const menusQuery = 'SELECT * FROM grid_menus'; // 查询所有菜单项

  connection.query(menusQuery, (err, menus) => {
    if (err) {
      console.error(err.message);
      return sendResponse(res, 500, '服务器错误');
    }

    // 构建层级结构
    const menuMap = {};
    const tree = [];

    // 初始化菜单映射
    menus.forEach(menu => {
      if (!menu.pid) menu.children = []; // 初始化 children 数组
      menuMap[menu.id] = menu; // 将菜单项存入映射
    });

    // 构建树形结构
    menus.forEach(menu => {
      if (menu.pid) {
        // 如果有父级 ID，则将其添加到父级的 children 数组中
        if (menuMap[menu.pid]) {
          menuMap[menu.pid].children.push(menu);
        }
      } else {
        // 如果没有父级 ID，则为顶级菜单
        tree.push(menu);
      }
      menu.meta = JSON.parse(menu.meta);
      // 格式化日期
      menu.created_at = dayjs(menu.created_at).format('YYYY-MM-DD HH:mm:ss');
      menu.updated_at = dayjs(menu.updated_at).format('YYYY-MM-DD HH:mm:ss');
    });

    // 返回结果，不包含 total
    sendResponse(res, 200, 'success', tree);
  });
};