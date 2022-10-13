""" Script to get restaurant data from API google Places """

from bs4 import BeautifulSoup
import datetime
import mysql.connector
import requests
from selenium import webdriver

API_KEY = "AIzaSyCbVsTWbCgBRCl8oyBU8Oav74EaG7MmCeY"

connection = mysql.connector.connect(host='localhost', database='events', user='root', password='AEPINMM') # create connection to the events database
cursor = connection.cursor() # creates cursor object, object to be used to execute the queries to the db

url = f'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurantes%20en%20Montevideo%20Uruguay&language=es-419&key={API_KEY}' # url google API with the search of restaurants in Montevideo

response = requests.get(url) 
results = response.json() 
places = results.get('results') # Get the list of the places (It returns only 20 results)
next_page = results.get('next_page_token') # token used to get 20 more results
while True: # loop to get more results until next_page is not None
    for place in places:
        try:
            photo_reference = place.get('photos')[0].get('photo_reference') # Photo reference to get the photo link
        except Exception:
            photo_reference = 'Sin información'
        title = place.get('name')
        place_location = place.get('formatted_address')
        price_level = place.get('price_level')
        price = 'Rango de precios: ' 
        # Price categorization propocionated by google
        if price_level == 0:
            price += 'Gratis'
        elif price_level == 1:
            price += 'Sin precio'
        elif price_level == 2:
            price += 'Moderado'
        elif price_level == 3:
            price += 'Costoso'
        elif price_level == 4:
            price += 'Muy Costoso'
        else:
            price += 'Sin información'
        place_id = place.get('place_id') # ID to get further information of the restaurant
        url = f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={API_KEY}' # url google API with the details of a restaurant
        response = requests.get(url) 
        results = response.json().get('result')
        phone_number = results.get('international_phone_number') #Data to add to description
        description = f'Telefono: {phone_number}\n'        
        open_days = results.get('opening_hours')
        if open_days is not None:
            open_days = open_days.get('weekday_text') #Data to add to description
            for day in open_days:
                description += day + '\n'
            description = description[:-1]
        link = results.get('website')
        image_url = f'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_reference}&key={API_KEY}' # url google API to get the photo of a restaurant
        chrome_options = webdriver.ChromeOptions() # Class for managing ChromeDriver specific options.
        chrome_options.add_argument('headless')  # Set headles option to start Chrome in the "background" without any visual output or windows 
        driver = webdriver.Chrome('/home/planitnow_pin/PlanItNow/back/chromedriver', options=chrome_options) # Start the browser with the options previously set and the chrome driver
        driver.get(image_url) 
        html = driver.page_source # Get the source of the current page
        soup = BeautifulSoup(html, 'lxml') # Parses the code
        try:
            image = soup.img['src'] # Get the link of the photo
        except Exception:
            continue
        date = 'No aplica'
        elements = {
            'title' : title, 
            'image' : image, 
            'link' : link,
            'place_location' : place_location, 
            'date' : date, 
            'price' : price, 
            'description' : description,
            }
        for element in elements: # loop to set those attributes that we couldn´t get information 
            if elements[element] is None:
              elements[element] = 'Sin información'
        """Create the query to insert data into the database"""
        insert = """INSERT INTO restaurant (restaurantID, title, image, link, place, date, price, description) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"""
        record = (elements['title'], elements['image'], elements['link'], elements['place_location'], elements['date'], elements['price'], elements['description'])
        cursor.execute(insert, record) # Insert the data into the DB
        connection.commit() # Save the change
    if next_page is None: # Check if ther is another page with 20 more results
        break
    url = f'https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page}&query=Restaurantes%20en%20Montevideo%20Uruguay&language=es-419&key={API_KEY}' # URL to 20 more results
    response = requests.get(url)
    results = response.json()
    places = results.get('results')
    next_page = results.get('next_page_token') # token used to get 20 more results
print(f'The restaurant script was exectued at {datetime.datetime.now().strftime("%d-%m-%Y %H:%M")}')
"""Close the contection to te DB and the driver of selenium"""
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
