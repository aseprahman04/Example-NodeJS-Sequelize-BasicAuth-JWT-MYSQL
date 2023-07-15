/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : gikslab_test

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 15/07/2023 21:30:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `startdate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `enddate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `skillId` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `skillId`(`skillId` ASC) USING BTREE,
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activities
-- ----------------------------

-- ----------------------------
-- Table structure for skills
-- ----------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of skills
-- ----------------------------
INSERT INTO `skills` VALUES (1, 'Archer', '2023-07-15 10:09:41', '2023-07-15 10:09:41');
INSERT INTO `skills` VALUES (2, 'Martial arts', '2023-07-15 10:09:41', '2023-07-15 10:09:41');
INSERT INTO `skills` VALUES (3, 'Football', '2023-07-15 10:09:41', '2023-07-15 10:09:41');

-- ----------------------------
-- Table structure for user_activities
-- ----------------------------
DROP TABLE IF EXISTS `user_activities`;
CREATE TABLE `user_activities`  (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `activityId` bigint NOT NULL,
  `userId` bigint NOT NULL,
  PRIMARY KEY (`activityId`, `userId`) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  CONSTRAINT `user_activities_ibfk_1` FOREIGN KEY (`activityId`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_activities_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_activities
-- ----------------------------

-- ----------------------------
-- Table structure for user_skills
-- ----------------------------
DROP TABLE IF EXISTS `user_skills`;
CREATE TABLE `user_skills`  (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` bigint NOT NULL,
  `skillId` bigint NOT NULL,
  PRIMARY KEY (`userId`, `skillId`) USING BTREE,
  INDEX `skillId`(`skillId` ASC) USING BTREE,
  CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_skills_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_skills
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `profile` enum('board','expert','trainer','competitor') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'board',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Asep Rahman', 'aseprahmanurhakim04@gmail.com', 'arn04', '$2a$08$ETn.9mJvODqiWu68SOaheu7eRawL8KNWh0Lhz3FJLUQDZHT2HHn1S', 'board', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5NDE1ODcyLCJleHAiOjE2ODk1MDIyNzJ9.AX5T8KO_2BmGk8wyNP46FA0bgE3byPEAwfi3FGQedls', '2023-07-15 10:09:41', '2023-07-15 10:11:12');
INSERT INTO `users` VALUES (2, 'Asep Rahman', 'aseprahmanurhakim04+1@gmail.com', 'arn05', '$2a$08$qzPZRjH4d5bKV5LQoSTuZOvWVn7Whr.WbSLuz.YI54/lODqJiwpQG', 'expert', NULL, '2023-07-15 10:09:41', '2023-07-15 10:09:41');
INSERT INTO `users` VALUES (3, 'Asep Rahman', 'aseprahmanurhakim04+2@gmail.com', 'arn06', '$2a$08$hz.lmJN6/ngYl/LB.t4nRea/QN.ohlhY0WEbCSmY9wRf6Vh4Zrr3G', 'trainer', NULL, '2023-07-15 10:09:41', '2023-07-15 10:09:41');

SET FOREIGN_KEY_CHECKS = 1;
