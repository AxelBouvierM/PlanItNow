-- Delete old data to insert new
-- cat delete_data.sql | mysql -hlocalhost -uroot -p (to run the script)

USE events;
DELETE FROM `music`;
DELETE FROM `theater`;
DELETE FROM `sport`;
DELETE FROM `dance`;
DELETE FROM `party`;
DELETE FROM `movie`;
DELETE FROM `others`;