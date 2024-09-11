/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : test_database

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 11/09/2024 16:35:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for grid_menus
-- ----------------------------
DROP TABLE IF EXISTS `grid_menus`;
CREATE TABLE `grid_menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `meta` json NOT NULL,
  `pid` int DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `pid` (`pid`),
  CONSTRAINT `grid_menus_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `grid_menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of grid_menus
-- ----------------------------
BEGIN;
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (1, 'Dashboard', '/dashboard', '{\"icon\": \"IconApps\", \"order\": 1, \"roles\": [1], \"locale\": \"首页\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', NULL, 'Layout', '2024-08-15 15:40:16', '2024-08-19 15:37:15');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (2, 'Settings', '/settings', '{\"icon\": \"IconSettings\", \"order\": 3, \"roles\": [1], \"locale\": \"设置\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', NULL, 'Layout', '2024-08-15 15:40:26', '2024-08-24 18:15:09');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (3, 'Workplace', '/workplace', '{\"icon\": \"IconDashboard\", \"order\": 1, \"roles\": [1], \"locale\": \"工作台\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', 1, '/dashboard/workplace', '2024-08-15 17:45:54', '2024-08-19 15:37:25');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (4, 'MenuManagement', '/menu', '{\"icon\": \"IconMindMapping\", \"order\": 1, \"roles\": [1], \"locale\": \"菜单管理\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', 2, '/settings/menu', '2024-08-16 10:34:21', '2024-08-19 15:37:30');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (8, 'System', '/system', '{\"icon\": \"IconComputer\", \"order\": 4, \"roles\": [1], \"locale\": \"系统\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', NULL, 'Layout', '2024-08-20 10:05:00', '2024-08-24 18:15:12');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (9, 'Document', '/document', '{\"icon\": \"IconFile\", \"order\": 2, \"roles\": [1], \"locale\": \"文档\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', NULL, 'Layout', '2024-08-23 19:07:42', '2024-08-24 18:15:41');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (10, 'VueDocument', '/vue-doc', '{\"icon\": \"vue\", \"order\": 1, \"roles\": [], \"locale\": \"Vue文档\", \"hideInMenu\": true, \"ignoreCache\": false, \"requiresAuth\": true}', 9, '/document/vueDoc', '2024-08-24 17:41:22', '2024-08-27 17:56:30');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (11, 'ViteDocument', '/vite-doc', '{\"icon\": \"vite\", \"order\": 2, \"roles\": [1], \"locale\": \"Vite文档\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', 9, '/document/viteDoc', '2024-08-24 17:45:01', '2024-08-24 18:18:10');
INSERT INTO `grid_menus` (`id`, `name`, `path`, `meta`, `pid`, `component`, `created_time`, `updated_time`) VALUES (12, 'ArcoDocument', '/arco-doc', '{\"icon\": \"arco\", \"order\": 3, \"roles\": [1], \"locale\": \"ArcoDesign文档\", \"hideInMenu\": false, \"ignoreCache\": false, \"requiresAuth\": true}', 9, '/document/arcoDoc', '2024-08-24 18:06:26', '2024-08-24 18:18:01');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
