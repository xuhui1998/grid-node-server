const sendResponse = require('../../../utils')
const connection = require('../../config/dbConfig')
const dayjs = require('dayjs');

// 菜单列表
exports.getMenus = (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // 每页数量
  const offset = parseInt(req.query.offset) || 0; // 偏移量

  const totalQuery = 'SELECT COUNT(*) AS total FROM grid_menus'; // 查询总数
  const menusQuery = 'SELECT * FROM grid_menus LIMIT ? OFFSET ?'; // 查询菜单项

  connection.query(totalQuery, (err, totalResults) => {
    if (err) {
      console.error(err.message);
      sendResponse(res, 500, '服务器错误');
    }

    const total = totalResults[0].total; // 获取总数

    connection.query(menusQuery, [limit, offset], (err, menus) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: '服务器错误' });
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
        menu.created_time = dayjs(menu.created_time).format('YYYY-MM-DD HH:mm:ss');
        menu.updated_time = dayjs(menu.updated_time).format('YYYY-MM-DD HH:mm:ss');
      });

      // 过滤掉 children 为空的菜单项
      // const filterEmptyChildren = (menuList) => {
      //   return menuList.map(menu => {
      //     if (menu.children.length === 0) {
      //       delete menu.children; // 删除 children 字段
      //     } else {
      //       menu.children = filterEmptyChildren(menu.children); // 递归处理子菜单
      //     }
      //     return menu;
      //   });
      // };

      // 返回结果
      sendResponse(res, 200, 'success', { total, list: tree })
    });
  });
};

// 添加菜单
exports.saveMenu = (req, res) => {
  const { id, name, path, pid, locale, order, requiresAuth, component, ignoreCache, icon, hideInMenu } = req.body; // 从请求体中获取数据

  // 校验必填字段
  if (!locale) {
    sendResponse(res, 400, '菜单名称不能为空')
  }
  if (!order) {
    sendResponse(res, 400, '排序不能为空')
  }
  if (!path) {
    sendResponse(res, 400, '菜单路径不能为空')
  }
  if (!component) {
    sendResponse(res, 400, '组件路径不能为空')
  }

  const meta = {
    locale,
    order,
    requiresAuth: requiresAuth || true,
    ignoreCache: ignoreCache || false,
    icon: icon || '',
    hideInMenu: hideInMenu || false,
    roles: [],
  };

  if (pid == 0) {
    const query = 'INSERT INTO grid_menus (name, path, meta, pid, component) VALUES (?, ?, ?, NULL, ?)';
    
    connection.query(query, [name, path, JSON.stringify(meta), component], (err, results) => {
      if (err) {
        console.error("输出错误", err.message);
        return sendResponse(res, 500, '服务器错误');
      }

      // 返回成功响应
      return sendResponse(res, 201, '菜单添加成功', { id: results.insertId });
    });
  } else {
    // 如果 pid 是有效的父级菜单的 id，插入子菜单
    const checkParentQuery = 'SELECT id FROM grid_menus WHERE id = ?';
    connection.query(checkParentQuery, [pid], (err, results) => {
      if (err) {
        console.error(err.message);
        return sendResponse(res, 500, '服务器错误');
      }
      if (results.length === 0) {
        return sendResponse(res, 400, '父级菜单不存在');
      }

      // 如果传入了 id，执行更新操作
      if (id) {
        const updateQuery = 'UPDATE grid_menus SET name = ?, path = ?, meta = ?, pid = ?, component = ? WHERE id = ?';

        connection.query(updateQuery, [name, path, JSON.stringify(meta), pid, component, id], (err, results) => {
          if (err) {
            console.error(err.message);
            return sendResponse(res, 500, '服务器错误');
          }

          // 返回成功响应
          return sendResponse(res, 200, '菜单更新成功');
        });
      } else {
        const query = 'INSERT INTO grid_menus (name, path, meta, pid, component) VALUES (?, ?, ?, ?, ?)';
        
        connection.query(query, [name, path, JSON.stringify(meta), pid, component], (err, results) => {
          if (err) {
            console.error(err.message);
            return sendResponse(res, 500, '服务器错误');
          }

          // 返回成功响应
          return sendResponse(res, 201, '菜单添加成功', { id: results.insertId });
        });
      }
    });
  }
};

// 获取所有菜单
exports.getMenuListAll = (req, res) => {
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