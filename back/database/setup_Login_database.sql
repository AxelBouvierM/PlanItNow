-- CREATE LOGIN DATABASE
-- Execute with:
-- cat setup_database.sql | mysql -hlocalhost -uroot -p

CREATE DATABASE IF NOT EXISTS login DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE login;
CREATE TABLE IF NOT EXISTS `users` (
	`UserID` varchar(1000) NOT NULL,
  	`username` varchar(50) NOT NULL,
  	`password` varchar(1000) NOT NULL,
  	`email` varchar(100) NOT NULL,
	`avatar` varchar(255) NOT NULL,
    PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;