-- TRUNCATE old data to insert new
-- cat TRUNCATE_data.sql | mysql -hlocalhost -uroot -p (to run the script)

USE events;
TRUNCATE brewery;
TRUNCATE restaurant;
TRUNCATE coffee;
TRUNCATE museum;
TRUNCATE entertainment;