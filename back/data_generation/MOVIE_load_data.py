""" Script to extract data about movies from movie """

from babel.dates import format_date
from bs4 import BeautifulSoup
import calendar
import datetime
import mysql.connector
import re
from selenium import webdriver

DB_KEY = open('/home/planitnow_pin/DB_KEY.txt').read().replace('\n', '')  # open and save the mysql pass into a variable

connection = mysql.connector.connect(host='localhost', database='events', user='root', password=DB_KEY)  # create connection to the events database
cursor = connection.cursor()  # creates cursor object, object to be used to execute the queries to the db

movie_elements = []  # List where the movie events are going to be loaded
while movie_elements == []:  # Loop to try execute until we got some movie data
    chrome_options = webdriver.ChromeOptions()  # Class for managing ChromeDriver specific options.
    chrome_options.add_argument('headless')  # Set headles option to start Chrome in the "background" without any visual output or windows
    driver = webdriver.Chrome('/home/planitnow_pin/PlanItNow/back/data_generation/chromedriver', options=chrome_options)  # Start the browser with the options previously set and the chrome driver
    driver.get('https://www.movie.com.uy/movies')  # get information of the link
    lxml = driver.page_source  # Get the source of the current page
    soup = BeautifulSoup(lxml, 'lxml')  # Parses the html code
    html = str(soup.contents[0])  # Get the source of the current page
    soup = BeautifulSoup(html, 'lxml')  # Parses the html code
    results = soup.find('div', class_='content')  # get the div tag that contains information about the movies
    movie_elements = results.find_all('div', class_="row alternate")  # get the list of all the movies
    for movie_element in movie_elements:  # traverse each movie to get further information
        try:
            title = str(movie_element.h2.a).split('>')[1].split('<')[0]
        except Exception:
            title = 'Sin información'
        try:
            image = movie_element.img['src']
        except Exception:
            title = 'Sin información'
        try:
            link = 'https://www.movie.com.uy/' + movie_element.a['href'][1:]
        except Exception:
            title = 'Sin información'
        p_list = movie_element.find_all('div', class_='col-lg-6 col-md-6 col-sm-6 col-xs-6')
        try:
            duration = p_list[0].text.replace('\n', '').split('Duración')[1]
        except Exception:
            duration = 'Sin información'
        try:
            director = p_list[1].text.replace('\n', '').split('Director')[1]
        except Exception:
            director = 'Sin información'
        try:
            genre = p_list[2].text.replace('\n', '').split('Género')[1]
        except Exception:
            genre = 'Sin información'
        try:
            actors = p_list[3].text.replace('\n', '').split('Actores')[1]
        except Exception:
            duration = 'Sin información'
        try:
            place = movie_element.ul.text.replace('\n', '').replace('Movie', ' - Movie')[3:]
        except Exception:
            duration = 'Sin información'
        if 'PROXIMAS' in place:
            place = 'Proximo estreno - Consultar link de la pelicula para mas información'
        description = ''
        date_info = None
        while description == '' and date_info is None:  # loop to get complete data because sometimes the scrap can't get the information correctly
            driver.get(link)
            lxml = driver.page_source  # Get the source of the current page
            soup = BeautifulSoup(lxml, 'lxml')  # Parses the code
            html = str(soup.contents[0])  # Get the source of the current page
            soup = BeautifulSoup(html, 'lxml')  # Parses the code
            description = soup.find('div', class_='colapse').contents[1].text
            date_info = soup.find('div', class_='pull-right hidden-lg')
            if date_info is not None:
                dates = date_info.find_all('option')
            date_list = []
            for date in dates:
                date_list.append(date.get('value'))
        description += 'Genero: ' + genre + '\n\n' + 'Duración: ' + duration + '\n\n' + 'Actores: ' + actors + '\n\n' + 'Director: ' + director
        try:
            since_date = date_list[0]
        except Exception:
            since_date = 'Sin información'
        to_date = date_list[len(date_list) - 1]
        # Change date in long format
        try:
            since_date = datetime.datetime.strptime(since_date, '%d/%m/%Y')
            since_date = format_date(since_date, format='long', locale='es')
            to_date = datetime.datetime.strptime(to_date, '%d/%m/%Y')
            to_date = format_date(to_date, format='long', locale='es')
        except Exception:
            continue
        if since_date == to_date:
            date = to_date
        else:
            date = f'Del {since_date} al {to_date}'
        price = 'Sin información visitar link de la pelicula'
        elements = {
            'title': title,
            'image': image,
            'link': link,
            'place': place,
            'date': date,
            'price': price,
            'description': description,
            }
        for element in elements:
            re.sub(' +', ' ', element)  # Regular expression to replace more than one space
        """Create the query to insert data into the database"""
        insert = """INSERT INTO movie (movieID, title, image, link, place, date, price, description) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"""
        record = (elements['title'], elements['image'], elements['link'], elements['place'], elements['date'], elements['price'], elements['description'])
        cursor.execute(insert, record)  # Insert the data into the DB
        connection.commit()  # Save the changes
print(f'The movie script was exectued at {datetime.datetime.now().strftime("%d-%m-%Y %H:%M")}')
"""Close the contection to te DB and the driver of selenium"""
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
