#!/usr/bin/env bash 

cat /home/planitnow_pin/PlanItNow/back/delete_daily_data.sql | mysql -hlocalhost -uroot -p
python3 /home/planitnow_pin/PlanItNow/back/MOVIE_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/TA_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/RT_load_data.py
rm -rf /tmp/.com.google.Chrome.*
