#!/usr/bin/python3
"""
Script to extract data about events from tick antel
"""

from bs4 import BeautifulSoup
import datetime
import mysql.connector
import requests
from selenium import webdriver
from time import sleep


DB_KEY = open('DB_KEY.txt').read().replace("\n","") #open and save the mysql pass into a variable

connection = mysql.connector.connect(host='localhost', database='events', user='root', password=DB_KEY) # create connection to the events database
cursor = connection.cursor() # creates cursor object, object to be used to execute the queries to the db

""" List of all the categories to load in the databases """
categories = {'theater' : 'https://tickantel.com.uy/inicio/buscar_categoria?2&cat_id=1', 
       'music' : 'https://tickantel.com.uy/inicio/buscar_categoria?3&cat_id=2',
       'sport' : 'https://tickantel.com.uy/inicio/buscar_categoria?4&cat_id=6', 
       'dance' : 'https://tickantel.com.uy/inicio/buscar_categoria?6&cat_id=10',
       'others' : 'https://tickantel.com.uy/inicio/buscar_categoria?5&cat_id=7',
       }
for category in categories: # traverse all the caregories 
    """Start the browser"""
    chrome_options = webdriver.ChromeOptions() # Class for managing ChromeDriver specific options.
    chrome_options.add_argument('headless')  # Set headles option to start Chrome in the "background" without any visual output or windows 
    driver = webdriver.Chrome('/home/planitnow_pin/PlanItNow/back/chromedriver', options=chrome_options) # Start the browser with the options previously set and the chrome driver
    driver.get(categories[category]) # get information of the link

    """Create some variables to emulate the scroll"""
    last_height = driver.execute_script('return document.body.scrollHeight') # Get scroll height
    scrolls = 0 # Counter of the numbers of scrolls 
    scroll_limit = 60 # Set up the limit of number of scroll loads

    while True and scrolls < scroll_limit: # Loop to scroll until we reach the bottom of the page or limit of scrolls
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight)') # Scroll down to bottom
        sleep(1) #sleep time for the page to load the scroll

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script('return document.body.scrollHeight')
        if new_height == last_height: # If it happens the bottom of the page was reached and break the scroll loop
            break
        last_height = new_height
        scrolls += 1

    html = driver.page_source # Get the source code of the current page
    soup = BeautifulSoup(html, 'lxml') # Parses the html code 
    results = soup.find('section', class_='resultados') # Get the section tag named resultados
    show_elements = results.find_all('div', class_='item') # Get all the div tags called items that represents the list of all the events 
    for show_element in show_elements: # traverse each event to get further information
        image = show_element.img['src']
        link = 'https://tickantel.com.uy/inicio' + show_element.a['href'][1:]
        """Geting information of each event"""
        html = requests.get(link) # Gets the html code of an specific event
        soup = BeautifulSoup(html.content, 'lxml') # Parses the code
        info_espectaculo = soup.find(id='espectaculo') # in this tag we got information about the Title and date of the event
        title = 'Sin información'
        since_date = 'Sin información'
        to_date = since_date
        if info_espectaculo is not None:
            title= info_espectaculo.find('h1', class_='title').find('span', class_='span-block').text
            if title != 'Sin información':
                span_list = (info_espectaculo.find('h1',class_='title').find_all('span'))
                if 'del' in span_list[0]:
                    since_date = span_list[1].text
                    to_date = span_list[3].text
                elif 'hasta el' in span_list[0]:
                    since_date = datetime.datetime.now().strftime('%d/%m/%Y')
                    to_date = span_list[1].text
                else:
                    since_date = span_list[0].text
                    to_date = since_date
            info_price = soup.find_all('div', class_='espectaculo-item')
            from_price = 'Sin información visitar link del evento'
            to_price = from_price
            if info_price != []:
                try:
                    span_list = info_price[2].find_all('span')
                except IndexError:
                    pass
                if span_list != []:
                    if 'Precio de las entradas:' == span_list[0].text:
                        from_price = span_list[2].text
                        to_price = span_list[3].text 
                        price = 'Desde $' + from_price + ' hasta $' + to_price 
                    else:
                        from_price = span_list[0].text
                        to_price = from_price
            info_description = soup.find(id='tab-informacion')
            description = 'Sin información'
            if info_description is not None:
                description = info_description.contents[1].text
            info_place = soup.find(id='lugar')
            place = 'Sin información'
            if info_place is not None:
                place = info_place.div.text.replace('\n','')
            if since_date == to_date:
                date = to_date
            else:
                date = f'Del {since_date} al {to_date}'
            if from_price == to_price:
                price = f'$ {to_price}'
            else:
                price = f'Desde $ {from_price} hasta $ {to_price}'
            """Create the query to insert data into the database"""
            insert = f'INSERT INTO {category} ({category}ID, title, image, link, place, date, price, description)'
            insert += ' VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)'
            record = (title, image, link, place, date, price, description)
            cursor.execute(insert, record) # Insert the data into the DB
            connection.commit() # Save the changes
    print(f'All {category} events added to database')

"""Close the contection to te DB and the driver of selenium"""
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
