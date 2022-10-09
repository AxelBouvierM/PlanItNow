#!/usr/bin/python3
"""
Script to extract data about movies from movie
"""

from bs4 import BeautifulSoup
import mysql.connector
from selenium import webdriver

DB_KEY = open('DB_KEY.txt').read() # open and save the mysql pass into a variable

connection = mysql.connector.connect(host='localhost', database='events', user='root', password=DB_KEY) # create connection to the events database
cursor = connection.cursor() # creates cursor object, object to be used to execute the queries to the db

theater_elements = [] # List where the theater events are going to be loaded
while theater_elements == []: # Loop to try execute until we got some theater data
    chrome_options = webdriver.ChromeOptions() # Class for managing ChromeDriver specific options.
    chrome_options.add_argument('headless') # Set headles option to start Chrome in the "background" without any visual output or windows 
    driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options) # Start the browser with the options previously set and the chrome driver
    driver.get('https://www.movie.com.uy/theater') # get information of the link
    lxml = driver.page_source # Get the source of the current page
    soup = BeautifulSoup(lxml, 'lxml') # Parses the html code 
    html = str(soup.contents[0]) # Get the source of the current page
    soup = BeautifulSoup(html, 'lxml') # Parses the html code 
    results = soup.find('div', class_='content') # get the div tag that contains information about the events
    theater_elements = results.find_all('div', class_='row alternate') # get the list of all theater events
    for theater_element in theater_elements: # # traverse each theater event to get further information
        title = str(theater_element.h2.a).split('>')[1].split('<')[0]
        image = theater_element.img['src']
        link = 'https://www.movie.com.uy/' + theater_element.a['href'][1:]
        p_list = theater_element.find_all('div', class_='col-lg-6 col-md-6 col-sm-6 col-xs-6')
        duration = p_list[0].text.replace('\n','').split('Duración')[1]
        director = p_list[1].text.replace('\n','').split('Director')[1]
        genre = p_list[2].text.replace('\n','').split('Género')[1]
        actors = p_list[3].text.replace('\n','').split('Actores')[1]
        place = 'Movie Montevideo'
        description = ''
        date_info = None
        while description == "" and date_info is None: # loop to get complete data because sometimes the scrap can't get the information correctly
            driver.get(link) 
            lxml = driver.page_source # Get the source of the current page
            soup = BeautifulSoup(lxml, 'lxml') # Parses the code
            html = str(soup.contents[0]) # Get the source of the current page
            soup = BeautifulSoup(html, 'lxml') # Parses the code
            description = soup.find('div', class_='colapse').contents[1].text
            date_info = soup.find('div', class_='pull-right hidden-lg')
            if date_info is not None:
                dates = date_info.find_all('option')
            date_list= []
            for date in dates:
                date_list.append(date.get('value'))  
        description += 'Genero: ' + genre + '\n\n' + 'Duración: ' + duration + '\n\n'+ 'Actores: ' + actors + '\n\n' + 'Director: ' + director
        since_date = date_list[0]
        to_date = date_list[len(date_list) - 1]
        if since_date == to_date:
            date = to_date
        else:
            date = f'Del {since_date} al {to_date}'
        price = 'Sin información visitar link del evento'
        """Create the query to insert data into the database"""
        insert = """INSERT INTO theater (theaterID, title, image, link, place, date, price, description) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"""
        record = (title, image, link, place, date, price, description)
        cursor.execute(insert, record) # Insert the data into the DB
        connection.commit() # Save the changes
print(f'All theater events added to database')

"""Close the contection to te DB and the driver of selenium"""
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
