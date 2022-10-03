#!/usr/bin/python3

import requests
import json
import pprint

API_KEY = open('API_KEY.txt').read() #open and save the api keyinto a variable
import requests

url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurantes%20en%20Montevideo%20Uruguay&key={API_KEY}"

response = requests.get(url)
results = response.json()
places = results.get('results')

for place in places:
      
    # Print value corresponding to the
    # 'name' key at the ith index of y
    photo_reference = place.get('photos')[0].get('photo_reference')
    
    title = place.get('name')
    place_location = place.get('formatted_address')
    price_level = place.get('price_level') #Make a scale
    price = "Rango de precios: " 
    if price_level == 0:
        price += "Gratis"
    elif price_level == 1:
        price += "Sin precio"
    elif price_level == 2:
        price += "Moderado"
    elif price_level == 2:
        price += "Costoso"    
    else:
        price += "Muy costoso"
    place_id = place.get('place_id')
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={API_KEY}"
    response = requests.get(url)
    results = response.json().get('result')
    phone_number = results.get('international_phone_number') #Description
    open_days = results.get('opening_hours').get('weekday_text') #Description
    description = f"Telefono: {phone_number}\n"
    for day in open_days:
        description += day + "\n"
    link = results.get('website')
    image = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_reference}&key={API_KEY}"

    print("===============================")
    print(title)
    print(image)
    print(link)
    print(place_location)
    print(price)
    print(description[:-1])
    print("===============================")

"""
title 
image 
link 
place 
date
price
description
"""