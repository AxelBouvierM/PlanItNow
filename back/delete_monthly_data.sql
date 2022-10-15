-- Delete old data to insert new
-- cat delete_data.sql | mysql -hlocalhost -uroot -p (to run the script)

USE events;
DELETE FROM `brewery`;
DELETE FROM `restaurant`;
DELETE FROM `coffee`;
DELETE FROM `museum`;
DELETE FROM `entertainment`;