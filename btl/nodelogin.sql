-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2020 at 06:53 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodelogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` bigint(35) NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sdt` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `fullname`, `password`, `email`, `sdt`) VALUES
(2, 'nguyenquyphuc', 'nguyen quy phuc ', '1', 'nguyenquyphuc1591999@gmail.com', 337768570),
(10, 'phucnq', 'me oi con yeu bo me1', '12', 'nguyenthithuan1591999@gmail.com', 33776857004),
(16, 'quy duc', 'quy duc con yeu bo', '1', 'nguyenquyduc1591999@gmail.com', 12312343),
(19, 'test', 'test', '123456', 'test1@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accounts_FB`
--

CREATE TABLE `accounts_FB` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `broad`
--

CREATE TABLE `broad` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `broadName` varchar(50) NOT NULL,
  `favourite` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `broad`
--

INSERT INTO `broad` (`id`, `email`, `broadName`, `favourite`) VALUES
(1, 'nguyenthithuan1591999@gmail.com', 'ML-intership', 0),
(2, 'nguyenthithuan1591999@gmail.com', 'ML-intership_1', 0),
(3, 'nguyenquyphuc1591999@gmail.com', 'Học tiếng anh', 0),
(4, 'nguyenquyphuc1591999@gmail.com', 'Học tiếng nhật', 0),
(6, 'nguyenthithuan1591999@gmail.com', 'Đồ án tốt nghiệp cử nhân', 0),
(13, 'nguyenthithuan1591999@gmail.com', 'test', 0),
(14, 'nguyenthithuan1591999@gmail.com', 'as', 0);

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id_card` bigint(20) NOT NULL,
  `text_card` varchar(200) NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id_card`, `text_card`, `id`) VALUES
(1, 'nhận dạng chũ viết tay', 2),
(3, 'Lập trình java cơ bản', 4),
(2, 'Học tiếng anh', 5),
(17, 'Học tiếng Nhật', 6),
(3, 'Lập trình C cơ bản', 7),
(4, 'lập trình beckend cơ bản', 8),
(5, 'lập trình hướng đối tượng', 9),
(16, 'Học bảng chữ cai tiếng nhật', 26),
(17, 'Học ngữ pháp tiếng nhất', 27),
(19, 'Học bảng chứ cái Thái Lan', 28),
(19, 'Học ngữ pháp ', 29),
(28, 'Học bảng chữ cái', 30),
(16, 'Luyện nghe', 31),
(17, 'Luyện đọc', 32),
(45, 'test', 34),
(48, 'Luyện nghe tiếng thái lan', 36),
(6, 'Ngữ pháp loại 1', 38),
(1, 'deep learning', 39),
(1, 'machien learning cơ bản', 40),
(2, 'Học tiếng thái lan', 41),
(2, 'Học tiếng Tây Ban Nha', 42),
(2, 'Lập trình nodejs', 43),
(3, 'Lập trình python cơ bản', 46),
(2, 'asd', 47),
(1, 'test', 48),
(1, 'asdf', 49),
(1, 'a', 50),
(53, 'test', 51),
(55, 'test', 52),
(55, 'á', 53),
(56, 'á', 54),
(57, 'asd', 55),
(60, 'as', 56),
(58, 'as', 57),
(59, 'as', 58),
(68, 'ád', 59),
(68, 'ád', 60),
(70, 'ád', 61),
(69, 'sà', 62),
(69, 'sfd', 63),
(70, 'f', 64),
(70, 'h', 65),
(70, 'as', 66),
(70, 'afd', 67),
(74, 'ads', 68),
(48, 'as', 69),
(48, 'as', 70),
(48, 'as', 71),
(80, 'asd', 75),
(79, 'fx', 78),
(85, 'as', 80),
(75, 'as', 81),
(75, 'sf', 82),
(75, 'saf', 83),
(75, 'xv', 84),
(75, 'zxv', 85);

-- --------------------------------------------------------

--
-- Table structure for table `title`
--

CREATE TABLE `title` (
  `id` bigint(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `id_card` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `title`
--

INSERT INTO `title` (`id`, `title`, `id_card`) VALUES
(1, 'Todo', 1),
(1, 'Doing', 2),
(1, 'Done', 3),
(2, 'Doing', 4),
(2, 'Todo', 5),
(3, 'học tiếng pháp', 6),
(3, 'học tiếng đức', 7),
(4, 'Học lập trình python cơ bản', 8),
(4, 'Học lập trình nodejs cơ bản', 9),
(4, 'học lập trình C#', 10),
(3, 'hoc tieng thai lan', 13),
(1, 'Học tiếng Nhật', 16),
(1, 'Học tiếng Nhật', 17),
(2, 'Done', 18),
(1, 'hoc tieng thai lan', 19),
(2, 'Bài tập lớn môn công nghệ web', 20),
(2, 'Bài tập lớn deeplearning', 21),
(3, 'Bảng chữ cái', 22),
(3, 'ngữ âm', 23),
(3, 'ngữ pháp', 24),
(3, 'Done', 25),
(4, 'Lập trình frontend cơ bản', 26),
(4, 'Học lập trình java cơ bản', 27),
(1, 'Học tiếng Hàn', 28),
(1, 'hoc tieng thai lan', 48),
(14, 'as', 75),
(14, 'as', 85),
(14, 'as', 86),
(14, 'as', 87),
(14, 'sàd', 88),
(14, 'sa', 89),
(14, 'sf', 90);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`,`email`);

--
-- Indexes for table `broad`
--
ALTER TABLE `broad`
  ADD PRIMARY KEY (`id`,`email`);

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `title`
--
ALTER TABLE `title`
  ADD PRIMARY KEY (`id_card`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` bigint(35) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `broad`
--
ALTER TABLE `broad`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `title`
--
ALTER TABLE `title`
  MODIFY `id_card` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
