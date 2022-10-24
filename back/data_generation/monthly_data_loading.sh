#!/usr/bin/env bash 

cat /home/planitnow_pin/PlanItNow/back/database/delete_monthly_data.sql | mysql -hlocalhost -uroot -pAEPINMM
python3 /home/planitnow_pin/PlanItNow/back/data_generation/RESTAURANT_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/data_generation/COFFEE_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/data_generation/ENTERTAINMENT_load_dat.py
python3 /home/planitnow_pin/PlanItNow/back/data_generation/BREWERY_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/data_generation/MUSEUM_load_data.py
rm -rf /tmp/.com.google.Chrome.*
