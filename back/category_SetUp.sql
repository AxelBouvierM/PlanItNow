CREATE DATABASE IF NOT EXISTS events DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE events;
CREATE TABLE IF NOT EXISTS `music` (
    `musicID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`musicID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `theater` (
    `theaterID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`theaterID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sport` (
    `sportID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`sportID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `dance` (
    `danceID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`danceID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `others` (
    `othersID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`othersID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `movie` (
    `movieID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`movieID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `party` (
    `partyID` int(11) NOT NULL AUTO_INCREMENT,  
    `title` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `place` varchar(255) NOT NULL,
    `date` varchar(255) NOT NULL,
    `price` varchar(1000) NOT NULL,
    `description` varchar(2000) NOT NULL,
    PRIMARY KEY (`partyID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

