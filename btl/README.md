# Nhom_10 

Cách chạy bài tập lớn:
- Cài đặt nodejs phiên bản v10.19.0.
- Cài đặt xampp.
- Bật xampp để chạy server.
- Đầu tiên vào file btl rồi tạo Database với câu lệnh ở trong work_together.sql, hiện tại chỉ tạo 2 bảng là accounts và accounts_FB. Chú ý trước khi chạy lệnh nào bảng nhớ khởi tạo Dasebase.
- Tiếp theo vào file btl/configuration/config.js để kiểm tra lại các thông số bên trong bao gồm host, username, password, database. Chú ý Database phải khớp với tên vừa tạo ở trên, password có thể để trống nếu không cài đặt.
- Ở trong thư mục btl bật Terminal và chạy lệnh node app.js.
- Vào đường dẫn sau để trải nghiệm: http://localhost:3000/

***
﻿## Danh sách thành viên:
1. Lê Đình Tài *(peartalent)*
2. Nguyễn Ngọc Trinh *(trinhnn040999)*
3. Nguyễn Quý Phúc *(NguyenQuyPhuc20173302)*
4. Nguyễn Thế Tùng Dương *(Duong991999)*


------sql hiện tại ---------

CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` bigint(35) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
ALTER TABLE `accounts` MODIFY `id` bigint(35) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

CREATE TABLE IF NOT EXISTS `accounts_FB` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



