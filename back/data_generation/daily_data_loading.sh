#!/usr/bin/env bash 

cat /home/planitnow_pin/PlanItNow/back/database/delete_daily_data.sql | mysql -hlocalhost -uroot -pAEPINMM
python3 /home/planitnow_pin/PlanItNow/back/data_generation/MOVIE_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/data_generation/TA_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/data_generation/RT_load_data.py
rm -rf /tmp/.com.google.Chrome.*
