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

 Date: 11/09/2024 16:34:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `role_id` int NOT NULL,
  `role_name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `name`, `password`, `avatar`, `role_id`, `role_name`) VALUES (1, 'xuhui', '$2a$10$9WkVKHW346GEKtPJ3B5Kd.v3e9wfb5rVwud92WMvnNwpFw1Wdtave', 'https://profile-avatar.csdnimg.cn/c430e3997f2844ae819f81f40436bc69_m0_48995032.jpg!1', 1, '超级管理员');
INSERT INTO `users` (`id`, `name`, `password`, `avatar`, `role_id`, `role_name`) VALUES (2, 'admin', '$2a$10$/duS0sL0vzfBfFj9zy9AGe5ngT4tnjyBYZNtPyYP014STe4.vNgaC', '', 1, '超级管理员');
INSERT INTO `users` (`id`, `name`, `password`, `avatar`, `role_id`, `role_name`) VALUES (3, 'zhouyu', '$2a$10$FM9ydmhnajEw5ICFgUfwReubD3Vr0feIZZAsY8FXX3c4Zg0n9i1YO', '', 1, '超级管理员');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
