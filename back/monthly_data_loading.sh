#!/usr/bin/env bash 

cat delete_monthly_data.sql | mysql -hlocalhost -uroot -p
python3 /home/planitnow_pin/PlanItNow/back/RESTAURANT_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/COFFEE_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/ENTERTAINMENT_load_dat.py
python3 /home/planitnow_pin/PlanItNow/back/BREWERY_load_data.py
python3 /home/planitnow_pin/PlanItNow/back/MUSEUM_load_data.py
