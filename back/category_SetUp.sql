CREATE DATABASE IF NOT EXISTS events DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE events;
CREATE TABLE IF NOT EXISTS `music` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
  	`name` varchar(255) NOT NULL,
  	`image` varchar(255) NOT NULL,
  	`link` varchar(255) NOT NULL,
	`description` varchar(2000) NOT NULL,
	`date` varchar(255) NOT NULL,
	`price` varchar(255) NOT NULL,
	`place` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;