""" Script to extract data about events from red tickets """

from bs4 import BeautifulSoup
import datetime
import mysql.connector
from selenium import webdriver
from time import sleep

DB_KEY = open('DB_KEY.txt').read().replace("\n","") #open and save the mysql pass into a variable 

connection = mysql.connector.connect(host='localhost', database='events', user='root', password=DB_KEY) # create connection to the events database
cursor = connection.cursor() # creates cursor object, object to be used to execute the queries to the db

""" List of all the categories to load in the databases """
categories = {
       'party' : 'https://redtickets.uy/busqueda?*,9,0',
       'sport' : 'https://redtickets.uy/busqueda?*,8,0',
       'sport2' : 'https://redtickets.uy/busqueda?*,2,0',
       'others' : 'https://redtickets.uy/busqueda?*,7,0',
       'music' : 'https://redtickets.uy/busqueda?*,3,0',
       'theater' : 'https://redtickets.uy/busqueda?*,6,0',
       }
for category in categories: # traverse all the caregories 
    chrome_options = webdriver.ChromeOptions() # Class for managing ChromeDriver specific options.
    chrome_options.add_argument('headless') # Set headles option to start Chrome in the "background" without any visual output or windows 
    driver = webdriver.Chrome('/home/vagrant/PlanItNow/back/chromedriver', options=chrome_options) # Start the browser with the options previously set and the chrome driver
    url = categories[category] 
    page = 0 # Variable used to change the page and get more results of a category
    while True: #Loop to change the page until we reach the last result
        driver.get(url) #get information of the link
        html = driver.page_source # Get the source code of the current page
        soup = BeautifulSoup(html, 'lxml') # Parses the html code 
        results = soup.find_all('main', class_='cards')[0] # Get the list of main tags named cards that contain events card information 
        if len(results) == 1: #It means that this page have not event to display
            break
        events = results.find_all('article', class_='card') # Get a list of all the events displayed in the page
        for event in events: # traverse each event to get further information
            span_list = event.find_all('span')
            try:
                title = span_list[0].text
            except Exception:
                title = 'Sin información'
            image = f'https://redtickets.uy/' + event.img['data-src']
            link = f'https://redtickets.uy/' + event.a['href']
            try:
                place = span_list[2].text 
            except Exception:
                place = 'Sin información'
            description = ""
            check_price = ""
            iterations = 0
            while check_price == '':
                driver.get(link)
                if category == 'theater': # theater events displays a dynamic window where the available chairs are shown, so we have to wait some seconds in order to get the information
                    sleep(5)
                else:
                    sleep(1)
                html = driver.page_source # Gets the html code of an specific event
                soup = BeautifulSoup(html, 'lxml') # Parses the code
                event_info =soup.find('div', class_='TableEventInfo')
                description_list = event_info.find_all('div', class_='Description')
                try:
                    description = description_list[1].text
                except Exception:
                    description = 'Sin información'
                try:
                    date = description_list[0].text
                except Exception:
                    date = 'Sin información'
                soup = BeautifulSoup(html, 'lxml')
                purchase_info =soup.find("div", class_='SectionPurchase')
                try:
                    check_price = purchase_info.find(id='comboTicket').text[1:]
                except Exception:
                    check_price = ''
                iterations += 1
                try:
                    price = purchase_info.find(id='comboTicket').text[1:].replace('(','').replace(') ','\n').replace('Elige tu entrada  ', '')
                except Exception:
                    price = 'Sin información'
                if iterations == 3:
                    price = 'Sin información visitar link del evento'
                    break
            category_id = category
            if category_id == 'sport2': # Rename the category to save it in the same DB category
                category_id = 'sport'
            """Create the query to insert data into the database"""
            insert = f'INSERT INTO {category_id} ({category_id}ID, title, image, link, place, date, price, description)'
            insert += ' VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)'
            record = (title, image, link, place, date, price, description) 
            cursor.execute(insert, record) # Insert the data into the DB
            connection.commit() # Save the changes
        page += 1
        url = categories[category].replace('0', str(page))
    print(f'All {category} events added to database')
print(f'The Red Tickets script was exectued at {datetime.datetime.now().strftime("%d-%m-%Y %H:%M")}')
"""Close the contection to te DB and the driver of selenium"""
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()