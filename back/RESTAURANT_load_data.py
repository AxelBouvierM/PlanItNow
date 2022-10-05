#!/usr/bin/python3

import requests
from selenium import webdriver
from bs4 import BeautifulSoup
import mysql.connector


API_KEY = open('API_KEY.txt').read() #open and save the api keyinto a variable

connection = mysql.connector.connect(host='localhost', database='events', user='root', password='root')
cursor = connection.cursor() 

url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurantes%20en%20Montevideo%20Uruguay&key={API_KEY}"

response = requests.get(url)
results = response.json()
places = results.get('results')
next_page = results.get('next_page_token')
while True:
    for place in places:
        photo_reference = place.get('photos')[0].get('photo_reference')
    
        title = place.get('name')
        place_location = place.get('formatted_address')
        price_level = place.get('price_level')
        price = "Rango de precios: " 
        if price_level == 0:
            price += "Gratis"
        elif price_level == 1:
            price += "Sin precio"
        elif price_level == 2:
            price += "Moderado"
        elif price_level == 3:
            price += "Costoso"    
        elif price_level == 4:
            price += "Muy Costoso" 
        else:
            price += "Sin información"
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
        if link is None:
            link = "Sin información"
        image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_reference}&key={API_KEY}"
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('headless')
        driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
        driver.get(image_url)
        html = driver.page_source
        soup = BeautifulSoup(html, 'lxml')
        image = soup.img['src']
        date = "No aplica"
        insert = """INSERT INTO restaurant (restaurantID, title, image, link, place, date, price, description) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"""
        record = (title, image, link, place_location, date, price, description[:-1])
        cursor.execute(insert, record)
        connection.commit()
    
    if next_page is None:
        break
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page}&query=Restaurantes%20en%20Montevideo%20Uruguay&key={API_KEY}"
    response = requests.get(url)
    results = response.json()
    places = results.get('results')
    next_page = results.get('next_page_token')

print("All restaurants added to database")
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
