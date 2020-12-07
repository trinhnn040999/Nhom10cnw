-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2020 at 02:08 PM
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
(2, 'nguyenquyphuc', 'nguyen quy phuc ', '1', 'nguyenquyphuc1591999@gmail.com', 12),
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
  `broadName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `broad`
--

INSERT INTO `broad` (`id`, `email`, `broadName`) VALUES
(1, 'nguyenthithuan1591999@gmail.com', 'ML-intership'),
(2, 'nguyenthithuan1591999@gmail.com', 'ML-intership_1'),
(3, 'nguyenquyphuc1591999@gmail.com', 'Học tiếng anh'),
(4, 'nguyenquyphuc1591999@gmail.com', 'Học tiếng nhật');

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
(1, 'Lập trình nodejs cơ bản', 3),
(2, 'Lập trình java cơ bản', 4),
(2, 'Học tiếng anh', 5),
(2, 'Học tiếng Nhật', 6),
(3, 'Lập trình C cơ bản', 7),
(4, 'lập trình beckend cơ bản', 8),
(5, 'lập trình hướng đối tượng', 9);

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
(4, 'học lập trình C#', 10);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `title`
--
ALTER TABLE `title`
  MODIFY `id_card` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
