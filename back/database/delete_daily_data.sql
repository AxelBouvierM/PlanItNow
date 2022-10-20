-- TRUNCATE old data to insert new
-- cat delete_daily_data.sql | mysql -hlocalhost -uroot -p (to run the script)

USE events;
TRUNCATE music;
TRUNCATE theater;
TRUNCATE sport;
TRUNCATE dance;
TRUNCATE party;
TRUNCATE movie;
TRUNCATE others;