-- --------------------------------------------------------
-- Verkkotietokone:              127.0.0.1
-- Palvelinversio:               11.2.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versio:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for school
CREATE DATABASE IF NOT EXISTS `school` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `school`;

-- Dumping structure for taulu school.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `id` varchar(50) NOT NULL,
  `timetable` varchar(50) NOT NULL,
  `slot` int(11) NOT NULL DEFAULT 0,
  `subject` int(11) NOT NULL DEFAULT 0,
  `room` int(11) NOT NULL DEFAULT 0,
  `teacher` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `timetable` (`timetable`),
  KEY `teacher` (`teacher`),
  CONSTRAINT `teacher` FOREIGN KEY (`teacher`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `timetable` FOREIGN KEY (`timetable`) REFERENCES `timetables` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.classes: ~223 rows (suunnilleen)
INSERT INTO `classes` (`id`, `timetable`, `slot`, `subject`, `room`, `teacher`) VALUES
	('03f71ff1', 'fa4378d0', 13, 10, 7, '7b99d1e6'),
	('05195b07', 'c0db84a8', 22, 7, 16, '3b3dc443'),
	('071d29e3', 'fa4378d0', 17, 8, 7, '6c8bfad2'),
	('07368604', 'f1822dd7', 8, 17, 5, '043d006b'),
	('090637bd', 'fa4378d0', 23, 2, 7, '426579ec'),
	('0944e483', '4d53ce12', 22, 1, 6, 'cd897b05'),
	('0a573b65', 'ceb60836', 9, 8, 9, '6c8bfad2'),
	('0aba9eb4', 'c0db84a8', 10, 5, 2, '3b3dc443'),
	('0b086772', '1c617a21', 8, 18, 4, 'bb83dc2e'),
	('0cc52098', 'f1822dd7', 30, 17, 5, '043d006b'),
	('0dc3f237', '4d53ce12', 32, 17, 6, 'cd897b05'),
	('0ebee046', '1c617a21', 11, 4, 4, 'bb83dc2e'),
	('0fa40949', '875917a5', 3, 3, 1, 'fc86b44e'),
	('0fdb0677', 'e39fefd4', 16, 19, 17, '426579ec'),
	('112a3504', '4d53ce12', 1, 18, 6, 'cd897b05'),
	('1173338a', 'ceb60836', 30, 8, 9, '6c8bfad2'),
	('117a03ec', 'fa4378d0', 8, 7, 16, 'b97ee106'),
	('117e3a71', 'c0db84a8', 1, 1, 2, '3b3dc443'),
	('12c7ca79', 'fa4378d0', 2, 13, 7, '3a81221f'),
	('1514ccb5', 'e39fefd4', 6, 7, 16, 'b97ee106'),
	('16d643da', 'ceb60836', 17, 2, 9, '426579ec'),
	('1a851070', '4d53ce12', 24, 18, 6, 'cd897b05'),
	('1b98047d', '430ef067', 9, 2, 3, '65e6224f'),
	('1be6d181', 'ceb60836', 11, 19, 17, '426579ec'),
	('1d313a76', '4d53ce12', 15, 7, 16, 'cd897b05'),
	('1d4791b3', 'ceb60836', 26, 6, 15, '6c8bfad2'),
	('1f1cd3ef', '1c617a21', 32, 5, 4, 'bb83dc2e'),
	('1fd229b7', '430ef067', 30, 2, 3, '65e6224f'),
	('20d72614', 'f1822dd7', 3, 3, 5, '043d006b'),
	('2200bba7', '1c617a21', 2, 1, 4, 'bb83dc2e'),
	('231ec60e', '430ef067', 18, 4, 3, '65e6224f'),
	('23d09967', '875917a5', 1, 18, 1, 'fc86b44e'),
	('285f5509', '4d53ce12', 25, 3, 6, 'cd897b05'),
	('2aefa22e', 'e39fefd4', 25, 1, 8, '3a81221f'),
	('2eb39f7a', 'c0db84a8', 8, 1, 2, '3b3dc443'),
	('32dda498', '1c617a21', 16, 1, 4, 'bb83dc2e'),
	('33706dbc', 'f1822dd7', 23, 1, 5, '043d006b'),
	('33fe9a2e', '4d53ce12', 9, 4, 6, 'cd897b05'),
	('340ec486', '430ef067', 24, 5, 3, '65e6224f'),
	('34d1443a', 'f1822dd7', 22, 18, 5, '043d006b'),
	('358c4b26', '875917a5', 10, 3, 1, 'fc86b44e'),
	('38490a1a', 'ceb60836', 23, 8, 9, '6c8bfad2'),
	('3a69f47e', 'f1822dd7', 2, 7, 16, '043d006b'),
	('3b5bc21d', 'e39fefd4', 1, 13, 8, '3a81221f'),
	('3b77f2be', 'e39fefd4', 2, 10, 8, '7b99d1e6'),
	('3bf85af9', '875917a5', 29, 7, 16, 'fc86b44e'),
	('3c3765e3', '430ef067', 15, 2, 3, '65e6224f'),
	('3c577bed', 'e39fefd4', 5, 7, 16, 'b97ee106'),
	('3cd474e6', 'e39fefd4', 11, 1, 8, '3a81221f'),
	('3d51dd85', '4d53ce12', 16, 7, 16, 'cd897b05'),
	('3f854fe7', '430ef067', 26, 8, 3, '65e6224f'),
	('40487b03', '430ef067', 29, 1, 3, '65e6224f'),
	('41ba66b3', '1c617a21', 23, 1, 4, 'bb83dc2e'),
	('428343c5', '430ef067', 1, 3, 3, '65e6224f'),
	('42dc536e', 'c0db84a8', 29, 3, 2, '3b3dc443'),
	('433ef401', 'f1822dd7', 31, 3, 5, '043d006b'),
	('43d6e16d', 'fa4378d0', 25, 16, 12, '8959e367'),
	('44a1ca59', 'fa4378d0', 15, 1, 7, '3a81221f'),
	('46c90de6', 'fa4378d0', 12, 1, 7, '3a81221f'),
	('47569870', '1c617a21', 15, 2, 4, 'bb83dc2e'),
	('47ea7c5a', 'c0db84a8', 9, 4, 2, '3b3dc443'),
	('48e88c14', 'e39fefd4', 34, 2, 8, '426579ec'),
	('4a657242', 'fa4378d0', 9, 7, 16, 'b97ee106'),
	('4b0dbb50', '1c617a21', 9, 2, 4, 'bb83dc2e'),
	('4d1946f6', 'ceb60836', 8, 1, 9, '3a81221f'),
	('4db2a21e', '875917a5', 23, 2, 1, 'fc86b44e'),
	('4e805989', '875917a5', 12, 4, 1, 'fc86b44e'),
	('50ccb44c', 'e39fefd4', 18, 8, 8, '6c8bfad2'),
	('513a7832', 'fa4378d0', 7, 21, 18, '8959e367'),
	('51bf1746', '1c617a21', 10, 4, 4, 'bb83dc2e'),
	('589110b3', 'f1822dd7', 29, 1, 5, '043d006b'),
	('58af348c', 'e39fefd4', 24, 2, 8, '426579ec'),
	('58c67b29', '4d53ce12', 19, 3, 6, 'cd897b05'),
	('58d08df1', 'fa4378d0', 35, 7, 16, 'b97ee106'),
	('59cca410', '875917a5', 8, 1, 1, 'fc86b44e'),
	('5b631330', 'e39fefd4', 33, 14, 13, 'b97ee106'),
	('5e3bc4c3', '1c617a21', 17, 3, 4, 'bb83dc2e'),
	('5e6bf6c1', '1c617a21', 27, 7, 4, 'bb83dc2e'),
	('5eba720e', '430ef067', 31, 3, 3, '65e6224f'),
	('5ebd9b5f', '4d53ce12', 8, 4, 6, 'cd897b05'),
	('60222782', 'c0db84a8', 11, 18, 2, '3b3dc443'),
	('6055a99c', '4d53ce12', 33, 6, 15, 'cd897b05'),
	('61b9c2e6', 'fa4378d0', 11, 17, 7, '3b98041b'),
	('62b3b0d8', 'f1822dd7', 24, 2, 5, '043d006b'),
	('666ee4c2', '430ef067', 10, 6, 15, '65e6224f'),
	('6767fe99', 'f1822dd7', 16, 4, 5, '043d006b'),
	('69169fef', 'e39fefd4', 15, 2, 8, '426579ec'),
	('69d5fc24', 'fa4378d0', 30, 2, 7, '426579ec'),
	('6badae18', '875917a5', 16, 1, 1, 'fc86b44e'),
	('6be33f79', '430ef067', 8, 18, 3, '65e6224f'),
	('6cae8aed', 'ceb60836', 12, 7, 16, 'b97ee106'),
	('6e5f6426', '1c617a21', 25, 3, 4, 'bb83dc2e'),
	('6ead3a47', 'ceb60836', 2, 9, 9, '6c8bfad2'),
	('6fbbd267', '4d53ce12', 11, 1, 6, 'cd897b05'),
	('71afa05d', '1c617a21', 3, 3, 4, 'bb83dc2e'),
	('71f8a4e0', 'e39fefd4', 17, 1, 8, '3a81221f'),
	('74ebbbdb', '430ef067', 25, 2, 3, '65e6224f'),
	('75dc8b51', 'f1822dd7', 4, 2, 5, '043d006b'),
	('75e6571f', 'f1822dd7', 6, 5, 5, '043d006b'),
	('77040ddf', 'f1822dd7', 17, 2, 5, '043d006b'),
	('7b224a34', 'e39fefd4', 29, 4, 11, '8959e367'),
	('7cd9e136', 'e39fefd4', 3, 12, 8, '8959e367'),
	('7d2bc590', '430ef067', 11, 8, 3, '65e6224f'),
	('7df99ad5', 'fa4378d0', 18, 10, 7, '7b99d1e6'),
	('7e08b7cc', 'c0db84a8', 26, 5, 2, '3b3dc443'),
	('7e0aefcc', 'fa4378d0', 23, 2, 7, '426579ec'),
	('81f3dd49', '875917a5', 30, 7, 16, 'fc86b44e'),
	('8246ffcd', 'e39fefd4', 19, 21, 18, '8959e367'),
	('83044db5', '430ef067', 16, 1, 3, '65e6224f'),
	('83eb4c3e', 'ceb60836', 31, 2, 9, '426579ec'),
	('85f93914', '875917a5', 4, 5, 1, 'fc86b44e'),
	('86ab9c43', '4d53ce12', 23, 2, 6, 'cd897b05'),
	('8ab66908', '4d53ce12', 5, 5, 6, 'cd897b05'),
	('8c6845f2', 'c0db84a8', 2, 1, 2, '3b3dc443'),
	('8ce61355', '4d53ce12', 12, 8, 6, 'cd897b05'),
	('8eae2406', 'ceb60836', 4, 12, 9, '3b98041b'),
	('900068e9', 'c0db84a8', 30, 1, 2, '3b3dc443'),
	('903117ac', 'ceb60836', 5, 18, 9, '3a81221f'),
	('93a95167', '430ef067', 3, 2, 3, '65e6224f'),
	('94ad9dfa', '4d53ce12', 17, 1, 6, 'cd897b05'),
	('94c0b57c', 'f1822dd7', 5, 5, 5, '043d006b'),
	('9569ac45', '1c617a21', 22, 1, 4, 'bb83dc2e'),
	('95a9b15d', '1c617a21', 13, 6, 15, 'bb83dc2e'),
	('95b46d7b', '875917a5', 24, 1, 1, 'fc86b44e'),
	('9604683f', '1c617a21', 30, 1, 4, 'bb83dc2e'),
	('988a0f52', 'e39fefd4', 4, 8, 8, '6c8bfad2'),
	('99a6849a', 'e39fefd4', 10, 13, 8, '3a81221f'),
	('9c164765', 'fa4378d0', 3, 17, 7, '3b98041b'),
	('9c409a89', 'fa4378d0', 32, 6, 15, '6c8bfad2'),
	('9f7658b1', 'f1822dd7', 1, 7, 16, '043d006b'),
	('9f935e18', '875917a5', 15, 2, 1, 'fc86b44e'),
	('9fa7f6cc', 'e39fefd4', 26, 18, 8, '3a81221f'),
	('a0005d7a', '4d53ce12', 31, 9, 6, 'cd897b05'),
	('a122b7ba', '430ef067', 32, 7, 16, '65e6224f'),
	('a29e3246', '875917a5', 18, 5, 1, 'fc86b44e'),
	('a30577de', '875917a5', 11, 6, 15, 'fc86b44e'),
	('a321b017', 'e39fefd4', 12, 17, 8, '3b98041b'),
	('a381ed26', 'fa4378d0', 4, 19, 17, '426579ec'),
	('a501235d', '875917a5', 2, 2, 1, 'fc86b44e'),
	('a5d43d68', '4d53ce12', 6, 5, 6, 'cd897b05'),
	('a63453df', 'c0db84a8', 15, 2, 2, '3b3dc443'),
	('a71b9803', 'c0db84a8', 25, 3, 2, '3b3dc443'),
	('a787f280', 'ceb60836', 24, 9, 9, '6c8bfad2'),
	('a885bf58', 'ceb60836', 32, 11, 9, '7b99d1e6'),
	('a96f806e', 'c0db84a8', 3, 2, 2, '3b3dc443'),
	('aa328e8f', 'f1822dd7', 26, 5, 5, '043d006b'),
	('aaec4877', 'f1822dd7', 10, 2, 5, '043d006b'),
	('ab33ce65', 'fa4378d0', 6, 21, 18, '8959e367'),
	('af2df1df', 'ceb60836', 10, 11, 9, '7b99d1e6'),
	('b10a819f', 'ceb60836', 15, 12, 9, '3b98041b'),
	('b212152f', '4d53ce12', 29, 8, 6, 'cd897b05'),
	('b2345687', '430ef067', 2, 1, 3, '65e6224f'),
	('b5a34611', 'ceb60836', 25, 19, 17, '426579ec'),
	('b6b9062e', '1c617a21', 31, 18, 4, 'bb83dc2e'),
	('b72736c4', '4d53ce12', 4, 1, 6, 'cd897b05'),
	('b89107ae', '1c617a21', 26, 7, 4, 'bb83dc2e'),
	('b934e314', 'ceb60836', 16, 13, 9, '3a81221f'),
	('b9ae039c', 'f1822dd7', 9, 3, 5, '043d006b'),
	('be3b7806', 'e39fefd4', 9, 16, 12, '8959e367'),
	('be90fb9e', '4d53ce12', 2, 2, 6, 'cd897b05'),
	('bef6da27', 'e39fefd4', 8, 16, 12, '8959e367'),
	('bfb90d3c', 'ceb60836', 29, 12, 9, '3b98041b'),
	('c2905112', 'ceb60836', 18, 2, 9, '426579ec'),
	('c3942fff', '875917a5', 17, 1, 1, 'fc86b44e'),
	('c45b546d', 'f1822dd7', 27, 5, 5, '043d006b'),
	('c4b8a99f', 'ceb60836', 22, 2, 9, '426579ec'),
	('c4f6d4cb', 'c0db84a8', 16, 1, 2, '3b3dc443'),
	('c70339ba', '1c617a21', 18, 7, 16, 'bb83dc2e'),
	('c75cb498', 'e39fefd4', 31, 10, 8, '7b99d1e6'),
	('c9043256', 'c0db84a8', 32, 5, 2, '3b3dc443'),
	('c993a376', '875917a5', 31, 1, 1, 'fc86b44e'),
	('c9f5643a', 'fa4378d0', 19, 2, 7, '426579ec'),
	('ca187b8e', '430ef067', 4, 7, 16, '65e6224f'),
	('cbb9df41', 'f1822dd7', 18, 1, 5, '043d006b'),
	('cc758303', 'ceb60836', 1, 19, 17, '426579ec'),
	('ccbd489d', '875917a5', 9, 8, 1, 'fc86b44e'),
	('ccea86b2', 'f1822dd7', 12, 6, 15, '043d006b'),
	('cd1425d5', '1c617a21', 29, 3, 4, 'bb83dc2e'),
	('cfbd04e9', 'fa4378d0', 33, 8, 7, '6c8bfad2'),
	('cfc6d818', 'e39fefd4', 32, 14, 13, 'b97ee106'),
	('d24b11e9', 'f1822dd7', 32, 8, 5, '043d006b'),
	('d36b11e5', 'c0db84a8', 24, 1, 2, '3b3dc443'),
	('d3f4ad84', '1c617a21', 4, 8, 4, 'bb83dc2e'),
	('d42efb06', 'c0db84a8', 31, 2, 2, '3b3dc443'),
	('d7698348', 'fa4378d0', 31, 9, 7, '6c8bfad2'),
	('d9c5e43b', 'e39fefd4', 23, 1, 8, '3a81221f'),
	('da056ad5', '4d53ce12', 18, 9, 6, 'cd897b05'),
	('da1aeba1', 'ceb60836', 19, 14, 13, 'b97ee106'),
	('db23b0c4', 'fa4378d0', 10, 19, 17, '426579ec'),
	('db67c8c8', '430ef067', 23, 18, 3, '65e6224f'),
	('dd739e91', '430ef067', 22, 1, 3, '65e6224f'),
	('dd8c611e', 'e39fefd4', 30, 4, 11, '8959e367'),
	('ddb5fd55', 'f1822dd7', 8, 17, 5, '043d006b'),
	('deebaf29', 'fa4378d0', 34, 7, 16, 'b97ee106'),
	('e01c29c8', 'fa4378d0', 27, 16, 12, '8959e367'),
	('e08c74d6', '1c617a21', 1, 2, 4, 'bb83dc2e'),
	('e0d10c4c', 'fa4378d0', 26, 16, 12, '8959e367'),
	('e121ee2d', '1c617a21', 12, 8, 4, 'bb83dc2e'),
	('e14a5d55', 'c0db84a8', 17, 1, 2, '3b3dc443'),
	('e1ad50e1', 'fa4378d0', 22, 1, 7, '3a81221f'),
	('e22926aa', '4d53ce12', 30, 3, 6, 'cd897b05'),
	('e27f9ee9', '4d53ce12', 10, 2, 6, 'cd897b05'),
	('e2b27ecc', 'f1822dd7', 25, 8, 5, '043d006b'),
	('e3ca03a0', 'fa4378d0', 5, 21, 18, '8959e367'),
	('e43053dc', '1c617a21', 24, 2, 4, 'bb83dc2e'),
	('e601f224', 'f1822dd7', 33, 1, 5, '043d006b'),
	('e6fd50f5', 'fa4378d0', 1, 10, 7, '7b99d1e6'),
	('e8bebab6', 'e39fefd4', 13, 1, 8, '3a81221f'),
	('ea739025', '4d53ce12', 3, 7, 16, 'cd897b05'),
	('ea866ca6', 'c0db84a8', 4, 6, 15, '3b3dc443'),
	('ea92fc57', 'fa4378d0', 24, 18, 7, '3a81221f'),
	('edbef1d1', 'f1822dd7', 11, 8, 5, '043d006b'),
	('edcca866', 'c0db84a8', 23, 7, 16, '3b3dc443'),
	('ef3c829c', 'f1822dd7', 15, 4, 5, '043d006b'),
	('f14b54fd', 'c0db84a8', 18, 8, 2, '3b3dc443'),
	('f1a68598', 'f1822dd7', 19, 7, 16, '043d006b'),
	('f48ee509', 'ceb60836', 3, 8, 9, '6c8bfad2'),
	('f5e4efef', 'e39fefd4', 20, 21, 18, '8959e367'),
	('f92d1490', '430ef067', 17, 4, 3, '65e6224f'),
	('fa8846ed', '875917a5', 22, 1, 1, 'fc86b44e'),
	('fcf12b86', 'fa4378d0', 16, 9, 7, '6c8bfad2'),
	('fe77610b', 'ceb60836', 20, 14, 13, 'b97ee106'),
	('fed04294', 'ceb60836', 13, 7, 16, 'b97ee106');

-- Dumping structure for taulu school.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `senderId` varchar(50) DEFAULT NULL,
  `timeAndDate` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `senderId` (`senderId`),
  CONSTRAINT `senderId` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.messages: ~18 rows (suunnilleen)
INSERT INTO `messages` (`id`, `title`, `content`, `senderId`, `timeAndDate`) VALUES
	('0ad09c03', 'Field trip coming', 'Okay. Have fun.', 'b3d66913', '2023-11-25 16:07:33'),
	('13347448', 'Field trip coming', 'Not with my kid you\'re not!', '403c2039', '2023-11-25 16:08:06'),
	('1bd01ebe', 'Hello Kerttu-Liisa', 'I am fine. How are you?', '65e6224f', '2023-11-07 20:52:08'),
	('1c48cf3a', 'An important announcement', 'Good.', '51691beb', '2023-11-05 19:07:44'),
	('20c73401', 'Field trip coming', 'We are going to visit the museum on 4th of December.', '65e6224f', '2023-11-25 16:03:59'),
	('3971da00', 'An important announcement', 'Good.', '51691beb', '2023-11-05 19:07:36'),
	('3b6f6a9a', 'Homework on 24.11', 'Copy that. Thanks!', '144d4d3c', '2023-11-25 15:20:40'),
	('6280eb2e', 'An accident took place', 'Okay. Thanks for letting us know.', 'b3d66913', '2023-11-25 15:36:15'),
	('6a30d35d', 'An important announcement', 'Good.', '51691beb', '2023-11-05 19:07:24'),
	('98fc8cee', 'An important announcement', 'Please receive this.', '51691beb', '2023-11-05 19:06:20'),
	('9a5e9876', 'Homework on 24.11', 'Alright. Have a good weekend!', '2d45aecc', '2023-11-25 15:20:57'),
	('aabeb80c', 'Hello Kerttu-Liisa', 'Splendid.', '65e6224f', '2023-11-25 11:44:14'),
	('b8358115', 'Field trip coming', 'The museum of natural history.', '65e6224f', '2023-11-25 16:05:02'),
	('ba83a29f', 'Field trip coming', 'Go ahead and do. Which museum?', '26e652e1', '2023-11-25 16:04:26'),
	('bfaae219', 'Homework on 24.11', 'Hello guardians of first grade. Today on friday, the homework given was as follows:\r\n1.Maths: Chapter 33 homework box\r\n2. Finnish: read page 34 and 35 out loud\r\n\r\n-Hellin', 'fc86b44e', '2023-11-25 15:18:41'),
	('c2a928a7', 'An accident took place', 'Today, at recess, Seidi tripped and bruised her knee. We patched her up. Just so you know.', '3b3dc443', '2023-11-25 15:35:55'),
	('d87081a0', 'Hello Kerttu-Liisa', 'I am fine as well.', '3b3dc443', '2023-11-25 11:43:55'),
	('e11daad4', 'Hello Kerttu-Liisa', 'How are you?', '3b3dc443', '2023-11-07 20:46:56');

-- Dumping structure for taulu school.messages_receivers
CREATE TABLE IF NOT EXISTS `messages_receivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receiverId` varchar(50) NOT NULL DEFAULT '',
  `messageId` varchar(50) DEFAULT NULL,
  `opened` tinyint(4) NOT NULL,
  `thread` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messageId` (`messageId`),
  KEY `receiverId` (`receiverId`),
  CONSTRAINT `messageId` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `receiverId` FOREIGN KEY (`receiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.messages_receivers: ~28 rows (suunnilleen)
INSERT INTO `messages_receivers` (`id`, `receiverId`, `messageId`, `opened`, `thread`) VALUES
	(49, '65e6224f', 'e11daad4', 1, '8faeaa28'),
	(50, '3b3dc443', '1bd01ebe', 1, '8faeaa28'),
	(51, '65e6224f', 'd87081a0', 1, '8faeaa28'),
	(52, '3b3dc443', 'aabeb80c', 1, '8faeaa28'),
	(53, '70e5b109', 'bfaae219', 0, '593f75dc'),
	(54, '300fb800', 'bfaae219', 0, 'a0166c3e'),
	(55, '71866ee4', 'bfaae219', 0, 'ede9aced'),
	(56, '2d45aecc', 'bfaae219', 1, 'd51dfdd4'),
	(57, 'ae3e4df1', 'bfaae219', 0, '4897546a'),
	(58, '144d4d3c', 'bfaae219', 1, '13ef8ccc'),
	(59, '5ebf8bf7', 'bfaae219', 0, 'ba663be6'),
	(60, 'b7d42d8e', 'bfaae219', 0, '493407f7'),
	(61, 'fc86b44e', '3b6f6a9a', 0, '13ef8ccc'),
	(62, 'fc86b44e', '9a5e9876', 0, 'd51dfdd4'),
	(63, 'b3d66913', 'c2a928a7', 1, 'ea51f345'),
	(64, '8a87441f', 'c2a928a7', 0, '6b2889a5'),
	(65, '3b3dc443', '6280eb2e', 0, 'ea51f345'),
	(66, 'b3d66913', '20c73401', 1, '24df1aa0'),
	(67, '2d45aecc', '20c73401', 0, 'd2ac2592'),
	(68, '8a87441f', '20c73401', 0, '66a75f76'),
	(69, '403c2039', '20c73401', 1, 'a8d8b41f'),
	(70, '26e652e1', '20c73401', 1, '1e90659f'),
	(71, '5b54da97', '20c73401', 0, 'd00486ac'),
	(72, '144d4d3c', '20c73401', 0, '7f1aa84f'),
	(73, '65e6224f', 'ba83a29f', 1, '1e90659f'),
	(74, '26e652e1', 'b8358115', 0, '1e90659f'),
	(75, '65e6224f', '0ad09c03', 0, '24df1aa0'),
	(76, '65e6224f', '13347448', 0, 'a8d8b41f');

-- Dumping structure for taulu school.notes
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student` varchar(50) NOT NULL DEFAULT '',
  `date` date NOT NULL DEFAULT curdate(),
  `slot` int(11) NOT NULL DEFAULT 0,
  `subject` int(11) DEFAULT NULL,
  `reason` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `student` (`student`),
  CONSTRAINT `student` FOREIGN KEY (`student`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.notes: ~13 rows (suunnilleen)
INSERT INTO `notes` (`id`, `student`, `date`, `slot`, `subject`, `reason`) VALUES
	(15, 'cf12101d', '2023-11-24', 30, 2, 3),
	(16, 'df9be1a7', '2023-11-24', 30, 2, 3),
	(17, 'cdd70674', '2023-11-24', 31, 2, 5),
	(18, 'cdd70674', '2023-11-24', 30, 1, 5),
	(19, '8f7f7b93', '2023-11-24', 31, 1, 6),
	(20, '2411cdab', '2023-11-24', 29, 7, 5),
	(21, 'ed6d18db', '2023-11-24', 29, 7, 5),
	(22, '490bcc9b', '2023-11-24', 31, 1, 3),
	(23, '98330674', '2023-11-24', 29, 3, 6),
	(24, 'b178e1cd', '2023-11-24', 32, 5, 3),
	(25, '587b0d72', '2023-11-23', 22, 1, 3),
	(26, 'cf12101d', '2023-11-23', 23, 18, 5),
	(27, 'df9be1a7', '2023-11-23', 25, 2, 6);

-- Dumping structure for taulu school.parents_children
CREATE TABLE IF NOT EXISTS `parents_children` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` varchar(50) NOT NULL DEFAULT '0',
  `child` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `parents_children_ibfk_1` (`parent`),
  KEY `parents_children_ibfk_2` (`child`),
  CONSTRAINT `parents_children_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `parents_children_ibfk_2` FOREIGN KEY (`child`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.parents_children: ~38 rows (suunnilleen)
INSERT INTO `parents_children` (`id`, `parent`, `child`) VALUES
	(23, '26e652e1', 'df9be1a7'),
	(24, '26e652e1', 'cdd70674'),
	(25, '300fb800', '2411cdab'),
	(26, '71866ee4', '2411cdab'),
	(27, 'b7d42d8e', '490bcc9b'),
	(28, '5ebf8bf7', '490bcc9b'),
	(29, '70e5b109', '8f7f7b93'),
	(30, '144d4d3c', 'ed6d18db'),
	(31, '2d45aecc', 'ed6d18db'),
	(32, 'ae3e4df1', 'f6b89b43'),
	(33, '5b54da97', 'df9be1a7'),
	(34, '5b54da97', 'cdd70674'),
	(35, 'fde4c217', 'b178e1cd'),
	(36, '22516cd8', 'b178e1cd'),
	(37, 'f18ff3a5', '140bb9e4'),
	(38, '300fb800', '98330674'),
	(40, '71866ee4', '98330674'),
	(41, '144d4d3c', '66ef3505'),
	(42, '403c2039', 'cf12101d'),
	(43, 'b3d66913', '587b0d72'),
	(44, '8a87441f', '587b0d72'),
	(45, '185fb7e9', 'b2f0d622'),
	(46, '1f5050d1', 'b2f0d622'),
	(47, '7a6abb8b', '04b96eb8'),
	(48, '9a075a20', '04b96eb8'),
	(49, '8a87441f', 'e4df5d03'),
	(50, 'c0dac621', '48f70a05'),
	(51, '16aec7f2', '48f70a05'),
	(52, 'c0dac621', '52500513'),
	(53, '16aec7f2', '52500513'),
	(54, '16aec7f2', '56a9eea8'),
	(55, 'c0dac621', '56a9eea8'),
	(56, '144d4d3c', 'dbd96eca'),
	(57, '2d45aecc', '66ef3505'),
	(58, '2d45aecc', 'dbd96eca'),
	(59, '637c4d27', '3e8fce99'),
	(60, 'c882613c', 'eacffabe'),
	(61, 'c2ab6e7b', 'eacffabe');

-- Dumping structure for taulu school.timetables
CREATE TABLE IF NOT EXISTS `timetables` (
  `id` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `grade` int(11) NOT NULL DEFAULT 0,
  `edited` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  CONSTRAINT `author` FOREIGN KEY (`author`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.timetables: ~9 rows (suunnilleen)
INSERT INTO `timetables` (`id`, `author`, `grade`, `edited`) VALUES
	('1c617a21', '3b3dc443', 4, '2023-11-18 17:28:33'),
	('430ef067', '65e6224f', 3, '2023-11-06 20:44:28'),
	('4d53ce12', 'cd897b05', 6, '2023-11-25 13:45:37'),
	('875917a5', '3b3dc443', 1, '2023-11-18 17:37:05'),
	('c0db84a8', '3b3dc443', 2, '2023-11-18 18:16:29'),
	('ceb60836', '7b99d1e6', 9, '2023-11-25 14:56:41'),
	('e39fefd4', '3a81221f', 8, '2023-11-25 14:43:53'),
	('f1822dd7', '043d006b', 5, '2023-11-25 13:22:40'),
	('fa4378d0', '426579ec', 7, '2023-11-25 14:25:53');

-- Dumping structure for taulu school.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` tinyint(4) NOT NULL DEFAULT 0,
  `firstname` varchar(50) DEFAULT '0',
  `lastname` varchar(50) DEFAULT '0',
  `address` varchar(50) DEFAULT '0',
  `phonenum` varchar(50) DEFAULT '0',
  `grade` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table school.users: ~61 rows (suunnilleen)
INSERT INTO `users` (`id`, `email`, `password`, `role`, `firstname`, `lastname`, `address`, `phonenum`, `grade`) VALUES
	('043d006b', 'kaija.kuhmonen@school.com', '1b4a6e565e0d0235324331b8828457400782f53c1d3ecdc11fa294db61c5580c40973c562775a2ddfacaf65fb449155e13566451e56c5fbf52273d669b1911ac.c3623019623639cd', 1, 'Kaija', 'Kuhmonen', 'Kummankatu 22', '0506548765', '5'),
	('04b96eb8', 'arvo.heiskanen@gmail.com', 'cd1d7a01cca7e90c57b6e117fdc2b47c5a856d0f0f7918e51e2c1b3f2e4de3462be93f63210ac9836ad47a99212529b51ad0dff0d92a111d780ec6586da1bdc2.ec39afb1eff6092f', 3, 'Arvo', 'Heiskanen', 'Liitokatu 31', '0442331765', '4'),
	('140bb9e4', 'netta.saarela@gmail.com', '061a70a36d308a424ccd2dbca35d77f73c758798e51cac1e7d0bc9f8af390404a5152f2750549afe37acd7ccf3a86e34370a28113467e384b6adad4e11bf7cb7.d1667b8261784d72', 3, 'Netta', 'Saarela', 'Saarikierto 111', '0422255431', '2'),
	('144d4d3c', 'jussi.toivonen@gmail.com', '7303db5a07816a4e30079e5ca48db642f45852b1b008526431bb71e17c9953ff4c1add50526af7b68c20da46f7b22da3b98c0545e2cae6405f27c2c8cb59d3cb.caf88ff18981b98e', 2, 'Jussi', 'Toivonen', 'Laaksotie 41', '0436754110', '0'),
	('16aec7f2', 'ulla.saari@gmail.com', 'b423250c7fb49395ce8a0fb0bd1ea7ebc9c756aa1901185e7a3128454709298edb421ae3265f32499d148989a676aab479756b3631952b636fcee9e034121c18.53cfa6fc23561680', 2, 'Ulla', 'Saari', 'Tiekatu 11', '0467771234', '0'),
	('185fb7e9', 'keijo.kivi@gmail.com', '033bedd49b593a0283062160d92f30ecc318d92cf30a4fc2c21f40062dd96922f934575e37282156ab6796a19634ba283b018b745dacf4112fec6f7854bc910d.d9ab7e5d248628c0', 2, 'Keijo', 'Kivi', 'Kivikaudenkierto 11', '0463354110', '0'),
	('1f5050d1', 'kiia.kivi@gmail.com', '2c09fb60b7032aaae36cde67971ebd819b77ea9a67e2ddfd99cb3f7804344d08e714ed14be3efb2872c37e1bcfef19f5e84a73850fff7d1a3879e9d5f080dab9.60db6e3c4c0dda3e', 2, 'Kiia', 'Kivi', 'Kivikaudenkierto 11', '0435567110', '0'),
	('22516cd8', 'venla.virtanen@gmail.com', '0d516c9a11f04b94f3b87c3c6df96249c36452ba1238b69e4074f16649b9f07b87eb80b5354191f2c082f54abf2578c949cf074832649107d054ba7bc3830119.8095723765184b7a', 2, 'Venla', 'Virtanen', 'Virrantie 44', '0443312665', '0'),
	('2411cdab', 'iivari.eskola@gmail.com', '7142754db0d588436b259b6e57cfe2afab95e158a37ed3569ccfb4f84d26953b45f2f526dd68509dd69fa84b9e81ea4f9654ac47b383e37dd035016195862df7.c985c7b0fcb9e9ac', 3, 'Iivari', 'Eskola', 'Lasipajantie 28', '0416633123', '1'),
	('26e652e1', 'petrus.potkonen@gmail.com', 'e98e4d1492ef61153475842e7f4c1c99c9f4d525e9b6d0645c7d12f90d5e41664299b65d015f68504d4bb7100a7bd851ad2290998bfc04ef8a062487b966b6ca.e59d78dbeeec4d43', 2, 'Petrus', 'Pötkönen', 'Sammakkolammentie 17', '0458765678', '0'),
	('2d45aecc', 'erika.launonen@gmail.com', '35f3a39d9921868a1270bc76d010b96190cdd9aacf6857f919268917155dae52a7be516a8686ef8374c6df0a13ee5bc9242c4d3cfdc41a2e37e0a2bcd9bf726c.4af2efb6c09b34d9', 2, 'Erika', 'Launonen', 'Laaksotie 41', '0461239876', '0'),
	('300fb800', 'erkki.eskola@gmail.com', 'e5a19cd9c68fd263501b865f2fec7858f0747f7eb81235941a92483d400aefb72f24960d06da7ac59b180b3b0acac1a57799adf3b3d08b3d562d9f7e1ff78434.d3b3b685a2373329', 2, 'Erkki', 'Eskola', 'Lasipajantie 28', '0414433567', '0'),
	('3a81221f', 'sivia.rehn@school.com', '8395bf57224e24c8d34ea0afecc483383d54c98f6e7cc428de564cae60d46d1df9e7fe7f90a41d07a6f16435d190c66578510d1581b2b59a123e1cd311b3bf42.71e27faa3befe81e', 1, 'Siviä', 'Rehn', 'Hallintotie 55', '0504435612', '0'),
	('3b3dc443', 'reino.reiska@school.com', '930c101138cc90d2ca7321944f7e5aebab6735ac5d2081f7aace85448f4e5ecb2c42301dc56f054849f803bb14a6cd87fbc909cd650f0507f414ff148f1b3dd5.253c7257bbc4b293', 1, 'Reino', 'Reiska', 'Laskettelijantie 44', '0505467328', '2'),
	('3b98041b', 'alvari.villanen@school.com', '7c5a77934ff5a4dcf10974ad70effec3f9d8399b0049ead9fe2604274d7dbf84e3247bf269e3f9ff079486b7fbaba0368d13ac4239dd089babda71f927c4a18a.790d9f103aa8fbe3', 1, 'Alvari', 'Villanen', 'Havisevankatu 82', '0501143780', '8'),
	('3e8fce99', 'marika.maijala@gmail.com', '57140bf226a221371e0860b821c6f84bbb191776b60d24632729f2c44afec7b170d0e07e80844cfab986a95899a837697b769acff4cacc978fef0bcc1d755426.d277e2edb99f5f1b', 3, 'Marika', 'Maijala', 'Riipuskuja 19', '0452213678', '5'),
	('403c2039', 'mirja.mantyla@gmail.com', 'cddb5a15673e2354cc73b05b1f6ed38bca318588a0c8e673832c5a5aaea590eae01786b904dea6c0361399c8cbb8b24baf45cf897514aced52e921e8eedef383.a0428253d762e15a', 2, 'Mirja', 'Mäntylä', 'Ohitustie 41', '0456674352', '0'),
	('426579ec', 'voitto.kokko@school.com', '835e94ce0bf597f12bd433f9bddd8e3c97765bccb303a0239251f98c04f3a1a23e275274d78a00a4e5563bcec1293ab2a4f2679ba03a81f4709c37bc8483b821.4c6961f87e07423f', 1, 'Voitto', 'Kokko', 'Pääsiäiskuja 12', '0505577901', '7'),
	('48f70a05', 'sanna.saari@gmail.com', '1a5bb398f58a433b195593666d6712f97ad6cf390cfa26f8d351bd119bef699e14953cdd7505b1a230244d051bf651e4b4e7c4ba514c180f0a27ddf2ab25b003.bf4399f1bff6adae', 3, 'Sanna', 'Saari', 'Tiekatu 11', '0445644110', '4'),
	('490bcc9b', 'unto.valtonen@gmail.com', 'fff0968f4b0268178dcb4141ec7b544504db6e8fb85c7340cf1cf8c06407dbcbe95431e9c85de2583c4d7f3929e92d8856c94f5b436bf9c05c87ee5329670aa5.e8ac64ed85e2f5b3', 3, 'Unto', 'Valtonen', 'Tornitie 400', '0417744356', '1'),
	('51691beb', 'admin@school.com', '0f8d1c15a3f8d41f661b3d3bf1910de1b976b1704509157e9b3e564352bef3dc0e9cb5349101234b2481e0ba8a7b5149a76ab5d82e65b1c6539c3771ce9c502e.c896495d4fd8e995', 0, '0', '0', '0', '0', '0'),
	('52500513', 'sami.saari@gmail.com', '023d41478acdc9021480783b9bf66ce1ddcf4b1c35baf2e063fdcd0387e6db62ad975a92dbedab4b66f6c66c7b50b831b83274b7faa737b597f4fc92522ea699.1101b6b1647af0f2', 3, 'Sami', 'Saari', 'Tiekatu 11', '04433561112', '5'),
	('56a9eea8', 'silja.saari@gmail.com', '3921a1793ee3a8c6e39fc6dc0574c1a77bb0690452a0aa21d424514c436988dd5a6a080b0828194315ddb66a3944d77583558df1db1c8a5cec75384045651a82.db457b2cccfe77a7', 3, 'Silja', 'Saari', 'Tiekatu 11', '0462221121', '6'),
	('587b0d72', 'seidi.litmanen@gmail.com', '8c8111008d829c225efa6309f6c9e727ba8d84c2355506425f9c9fcc80c9a900e8e06affc0d3caef341c3af9729880275de4fdb868f581cf8470fa8628cb5de4.0073e46209521627', 3, 'Seidi', 'Litmanen', 'Toritie 221', '0435521765', '3'),
	('5b54da97', 'pirkitta.potkonen@gmail.com', 'b99569788c10923d205641963b32274076e0cdb5b3c21118520446710e1beb99a5e63036d0ba41aacb5d57c56b250ed3f26847f9109790987519e54bf60d8e40.106740f2503bc248', 2, 'Pirkitta', 'Pötkönen', 'Sammakkolammentie 17', '0446677543', '0'),
	('5ebf8bf7', 'venla.valtonen@gmail.com', '1f7db802d8e1f0795319900e23fe3ec722034657562746acf6407f9013a6bd2f0a73f0f53bb3dfb11fe4b841e0780b68359ff2a054c51bfbfcb8ec4d85cd9c28.ed73ca38ac1b1f24', 2, 'Venla', 'Valtonen', 'Tornitie 400', '0426754880', '0'),
	('637c4d27', 'mirja.maijala@gmail.com', '3848dc7a6495ea1008a337716d3679267922fcf51c9f12996c8e5a2eda09f2c81710145d84c68a45160b6b9379ee739962ef217314dd511bdc7c84aebc924880.2ce68493a36f5e80', 2, 'Mirja', 'Maijala', 'Riipuskuja 19', '0412256730', '0'),
	('65e6224f', 'kerttu-liisa.koskinen@school.com', 'df2d7d0a0167767498775c0a15800e5c0dafe2b8fdf668187f4662dbc4fdff15930fc91af88522029989d11d51e7adcf1d11202b3e2726b5d8e633727f3ab4e6.0317f3e70e38bb4b', 1, 'Kerttu-Liisa', 'Koskinen', 'Tiukkatie 23', '0501253468', '3'),
	('66ef3505', 'kusti.toivonen@gmail.com', 'fbdfc844975276448641b7134f414f538f17f6999d73f86350f357b20f635ed4135ce908f3798fbf65eb06232c534200627af8872e1a3309a6137c730b638e89.2f95cf570c1500a3', 3, 'Kusti', 'Toivonen', 'Tammelantie 111', '0431254326', '3'),
	('6c8bfad2', 'sointu.repo@school.com', '8aea67a3f58e72bb6a4c47d398c55d152a6210b56692bf5dae7088c5dfc61568bda1edd9732527431c3051438dc0458b781ed16b478acea897f234a4295f4008.127c17604a50120d', 1, 'Sointu', 'Repo', 'Laulajantie 41', '0508876900', '0'),
	('70e5b109', 'anna.anttonen@gmail.com', 'b915b80fa18ed0754cc2ebb13ac8a9527772aa184d64dc4830738fa6232bb4e9a217bceb879dbbb5b9e6d5b036eadf8e2ea1d30ce5af0b08c0c05c8fe035e2d3.c6c67149b612d033', 2, 'Anna', 'Anttonen', 'Långstrumpintie 11', '0436674328', '0'),
	('71866ee4', 'ulriikka.eskola@gmail.com', 'd96faf2194192053d88c3faf78d91f863d70f79208d2ddaca33b301516d7c3ab2d4d766e6f4b886df0710187aa02b17a5c6839ef4c3d792520d3d3cdc27bac93.9a9018c951d77248', 2, 'Ulriikka', 'Eskola', 'Lasipajantie 28', '0417788432', '0'),
	('7a6abb8b', 'hessu.heiskanen@gmail.com', '49365c14973cabaf14587dd8640fd2581a50c5515744d9ceb390c7019b0d07968598312eba4d6fff81379f71b986b113c7b52f5c326b118698152eff934ea7dc.6c44b2ceb3dc5581', 2, 'Hessu', 'Heiskanen', 'Liitokatu 31', '0442212443', '0'),
	('7b99d1e6', 'terttu.leino@school.com', '56fcc8c0175d7f237ec5da1f8609fff8a56b48b37c634cabef7df07dd729603ce83dce51423187f5f696b0c5fb03702e3226953109ca1a287df164a9794b1b85.36a403d5fd908e54', 1, 'Terttu', 'Leino', 'Leipomotie 12', '0504357212', '9'),
	('8959e367', 'hilppa.kokkonen@school.com', '168d2c1822c5ba3c6a973a23a95779b32014c8d11d3ffb9e3856869fef7cb5918e44179ff13d2f2823814f03cd7a01f5c7d4dfc62b9e93c6b1e2c4e5d62dfbe9.8f00564827ace40c', 1, 'Hilppa', 'Kokkonen', 'Keittiökuja 68', '0504765899', '0'),
	('8a87441f', 'leila.litmanen@gmail.com', '0cce207055992567d5ed29cf715e857400bf3fadf05b2280aeb45a7a0be6ace4c374667c70186653d70aff62b415dd61a75c89ea2617d80081d55834ba3b6654.958e1ad4be163e1f', 2, 'Leila', 'Litmanen', 'Toritie 221', '0458879663', '0'),
	('8f7f7b93', 'peppi.anttonen@gmail.com', 'f90d6381fec348a7ec5ad11ecbacec10472b0e327efd4c0c3830cf4d93e812b85b9f3672b64ddafe3bfe6558ab002b8edf0c98ef01950e767d3734c5a2c62230.b7e1b0acb41ef57a', 3, 'Peppi', 'Anttonen', 'Långstrumpintie 11', '0414327658', '1'),
	('98330674', 'anelma.eskola@gmail.com', '2cfa71f94f81246268b0578a653ace8f146f0073fdbb0bd291a47c67b2513edbfe1ef926f51d39134feed09308361893556b74b422c348b2ac5c44dee542d23c.1635f98333f14f68', 3, 'Anelma', 'Eskola', 'Lasipajantie 28', '0426677541', '2'),
	('9a075a20', 'hella.heiskanen@gmail.com', 'ff16397b45c7b674aa37d23a7e3c249cca41d139aecf9496a0d8785b49904ba6ddf551e7151f5b12283853b8bce1973d0efb8c6fa5cacb8f6253397c96693c75.48d4b148980683d9', 2, 'Hellä', 'Heiskanen', 'Liitokatu 31', '0443556110', '0'),
	('ae3e4df1', 'lasse.luoma@gmail.com', '1213cbf03922444b1c2ab875b73dd36a344975dbb02d7d67d450431d1aa19dd2162bbda50dbe57eac78ff8b24881b2b8aedbbb747b90c8adc2ac03e2652452a9.ac18b3aa8b17df53', 2, 'Lasse', 'Luoma', 'Luomankuja 600', '0425553265', '0'),
	('b178e1cd', 'alex.virtanen@gmail.com', '9c50e5d054bf9134a8a940ccf3da18b6ae2ec82ee796b81966007803d1a61164c6417ba10dc18db993aa72f3ce6b6e714e13cf3b6a1ffb7f5b640f6cd499482a.e6fcf4c81ab62221', 3, 'Alex', 'Virtanen', 'Virrantie 44', '0423324567', '2'),
	('b2f0d622', 'leo.kivi@gmail.com', 'e3017448d9191b6c4e905960da70b6cce6373766cd71b395bca1f3a8c8541e672691e333490cce2012df0f1e7f570d5e167fc2949a9ce8f1b15d348f45009e0e.376f9076ae02f23d', 3, 'Leo', 'Kivi', 'Kivikaudenkierto 11', '0442211456', '4'),
	('b3d66913', 'erkki.karvonen@gmail.com', '9406a477382800b00a1c7eaebf50691e824aa4cb6cbb967cace9dfee9f3216a398f49e6d080910707dcb99cf45a845cbac231d50e4678a80907dabc11c174864.2000a7eaa30129a9', 2, 'Erkki', 'Karvonen', 'Toritie 221', '0452231657', '0'),
	('b7d42d8e', 'veijo.valtonen@gmail.com', 'c1c968ed1cbbc39550e50c67efd5023e2152dfb3762cdb760ceb53863c5844be63b6da18d2770b72a6038e93449d6b5065dd27d98acf2409995d1e279d57fb5a.020617bed8fc9a7c', 2, 'Veijo', 'Valtonen', 'Tornitie 400', '0446732015', '0'),
	('b97ee106', 'tarmo.hakkarainen@school.com', '8fb50acde4ee053b8f4fc77c5f42c67fcfee953e9f8952cf720c4c18b03516b7e38a1a79cbf7520e26dc9b8966bafb42412e9ce050e2e14f04b38b203742b165.3a0b0daa0f15e5b5', 1, 'Tarmo', 'Hakkarainen', 'Eläintarhantie 42', '0507788654', '0'),
	('bb83dc2e', 'huugo.jarvinen@school.com', '6f51b6cdd3eae16f71167d741b09ad061028da83685fc2684da800e6d0b5697d347c52ee0fe5196e38da7d731f18129017d89d996d5519a1140ad6033a1f9d7b.530551b017984d56', 1, 'Huugo', 'Järvinen', 'Lainalahdentie 46', '0502254768', '4'),
	('c0dac621', 'seppo.saari@gmail.com', '5b32b3dbc0c1cc2756234a9ea3d1a4fa5f0e5f41ea4efdd3968de243403479b0b11d64d7d477de399c90924176abf12485403f66260818a9b10dae23908499f2.a73e18e1418d4366', 2, 'Seppo', 'Saari', 'Tiekatu 11', '0441112567', '0'),
	('c2ab6e7b', 'titta.terho@gmail.com', '7fdc843dfa8f3f68a3e6310b3fb57b1424fb4d3373029466155309451c1667676963cc00543ab8cff43d1db4ad0b6da79fe958fa51c6d1e60dbda8dad1193fbc.6669eda81b79a2ba', 2, 'Titta', 'Terho', 'Tokerotie 100', '0431105543', '0'),
	('c882613c', 'teppo.terho@gmail.com', 'b199d339b9971c5b0526bf8cdc09428a3b253b3cdb0f61871616f66a692ed16bd1ce7ac3c7304b373e4a46504c7ba190622c950e203090f35f67df8b8de1d6f0.9b06bf7fdf46e26b', 2, 'Teppo', 'Terho', 'Tokerotie 100', '0453321102', '0'),
	('cd897b05', 'mattias.kankkunen@school.com', '5e63cadbe12b595547df102883e8af7eb2393dd009da26556d055eff406e323a92513d81ab0a638395267de56ffaa93cb8240b348ba29285cd02da86960bf144.76b4eecb517b7aaf', 1, 'Mattias', 'Kankkunen', 'Pitkäripaisentie 71', '0503245876', '6'),
	('cdd70674', 'pernilla.potkonen@gmail.com', 'b4961f30c833aa60e4828037fcde49f65de6c5c135245e20eebadd02319fd4254de06f03868cd2c4722df1210e676db79df7bb4ef87d58e7a759aa9b50b0a835.37bb5cdf653febcc', 3, 'Pernilla', 'Pötkönen', 'Sammakkolammentie 17', '0425467890', '2'),
	('cf12101d', 'alfred.mantyla@gmail.com', '0f6e41475cab920c0b9680f0f2ba6800dd9275f5e91954eed49a59d822231a1a2d15e629fda9b0c99178efb89a8c83447074baf55ba4a54755af60aef3490c7e.21c1880b43520d5e', 3, 'Alfred', 'Mäntylä', 'Ohitustie 41', '0436654235', '3'),
	('dbd96eca', 'taneli.toivonen@gmail.com', '57e9bbd87415bee0cad16332b6b98df261a91f8fecb750b414b633b90f3d68603bce00260b8a94789f95007caf5cd72af188119d83b68660bb08ccd07b5f4f26.e21b866839210367', 3, 'Taneli', 'Toivonen', 'Laaksotie 41', '0463345121', '5'),
	('df9be1a7', 'pontus.potkonen@gmail.com', '616da7aa41daf17fc41a4380bb3b6a3bf227ee059d1b381f7ee47a0b802908ced596d2a9b4d8d52d979aa47f1bbe2b399871c3f3984096811d7605e77eac0fd6.b4470f3704342131', 3, 'Pontus', 'Pötkönen', 'Sammakkolammentie 17', '0432214452', '3'),
	('e4df5d03', 'antti.litmanen@gmail.com', '2959e2c8c91d5b421c2794c0c542e0521337b349dea069e8870b61e41c56f1ace97a0abcc12b75d348225ebf0a78aab810c62bf45b20ff939ca2bf7c2c0c2be2.ddc9fb1153b249da', 3, 'Antti', 'Litmanen', 'Toritie 221', '0445553289', '4'),
	('eacffabe', 'iina.terho@gmail.com', '0a29f598a3704e5675b813c4b9b2632be073338043962cc8d2e5cda49f483febc85baa6940acec7a372c366736c03583dc737349ace3d605fa27ee34ef27e847.cc89fff6257fb2ad', 3, 'Iina', 'Terho', 'Tokerotie 100', '0453300112', '5'),
	('ed6d18db', 'johannes.toivonen@gmail.com', 'f459d9599331c82aae4e985f3aae3ecdb14e57e982ae4611f10705686e88433266c44d47ff1e6f6d0834101d1835f344acb24009334a33139b9ac27c10b626c6.efda446c177475f9', 3, 'Johannes', 'Toivonen', 'Laaksotie 41', '0418900123', '1'),
	('f18ff3a5', 'satta.saarela@gmail.com', 'd23017d673d0179fee1f0ac8f05dd8728faa4ffd456f382d9456f3683c34e7a5550c652ed19a362a9147dcdb4ebd65db9b317fef4894afa5ffa2971df3572b6f.641685e2b9ff6378', 2, 'Satta', 'Saarela', 'Saarikierto 111', '0431115467', '0'),
	('f6b89b43', 'sylvia.luoma@gmail.com', 'c12030c6ae5937a6dc8f4de2807f59788ca5899798410c12eb87519a73e1d2b0a93a88cb84f973dfbd036f5589e6581114f7d6e5e7249bc03a494701f08e22b5.391a6bac6ddc7093', 3, 'Sylvia', 'Luoma', 'Luomankuja 600', '0415566432', '1'),
	('fc86b44e', 'hellin.laukkanen@school.com', 'f3b0145b5eada5bf5eaf14683aeab243b3c1715a53dfc5f48e2f68b161dce1cdb6e1df119ec0cf0f606f8189085d486edc7f0d472deae6a8b67818e5394258a5.06a05d3e7b9a8b87', 1, 'Hellin', 'Laukkanen', 'Tallitie 49', '0503321144', '1'),
	('fde4c217', 'ville.virtanen@gmail.com', 'cbee1daaf122acfcf5334b91ccb0b3d686f9618b8e8a6c466a8695e3a3967e61d80802e55c7f297adcc3ab2c19d148be81cf7d77598c387105d00db7c06b15ed.e13195b17499cae8', 2, 'Ville', 'Virtanen', 'Virrantie 44', '0447866554', '0');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
