#!/usr/bin/python3

from bs4 import BeautifulSoup
from selenium import webdriver
import mysql.connector


DB_KEY = open('DB_KEY.txt').read() #open and save the mysql pass into a variable

connection = mysql.connector.connect(host='localhost', database='events', user='root', password=DB_KEY)
cursor = connection.cursor() 

movie_elements = []
while movie_elements == []:
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('headless')
    driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
    driver.get('https://www.movie.com.uy/theater')
    lxml = driver.page_source
    soup = BeautifulSoup(lxml, 'lxml')
    html = str(soup.contents[0])
    soup = BeautifulSoup(html, 'lxml')
    results = soup.find("div", class_="content")
    movie_elements = results.find_all("div", class_="row alternate")
    for movie_element in movie_elements:
        title = str(movie_element.h2.a).split(">")[1].split("<")[0]
        image = movie_element.img['src']
        link = "https://www.movie.com.uy/" + movie_element.a['href'][1:]
        p_list = movie_element.find_all('div', class_="col-lg-6 col-md-6 col-sm-6 col-xs-6")
        duration = p_list[0].text.replace("\n","").split("Duración")[1]
        director = p_list[1].text.replace("\n","").split("Director")[1]
        genre = p_list[2].text.replace("\n","").split("Género")[1]
        actors = p_list[3].text.replace("\n","").split("Actores")[1]
        place = "Movie Montevideo"
        description = ""
        date_info = None
        while description == "" and date_info is None:
            driver.get(link)
            lxml = driver.page_source
            soup = BeautifulSoup(lxml, 'lxml')
            html = str(soup.contents[0])
            soup = BeautifulSoup(html, 'lxml')
            description = soup.find("div", class_="colapse").contents[1].text
            date_info = soup.find("div", class_="pull-right hidden-lg")
            if date_info is not None:
                dates = date_info.find_all("option")
            date_list= []
            for date in dates:
                date_list.append(date.get('value'))  
        description += "Genero: " + genre + "\n\n" + "Duración: " + duration + "\n\n"+ "Actores: " + actors + "\n\n" + "Director: " + director
        since_date = date_list[0]
        to_date = date_list[len(date_list) - 1]
        if since_date == to_date:
            date = to_date
        else:
            date = f"Del {since_date} al {to_date}"
        price = "Sin información visitar link de la pelicula"
        insert = """INSERT INTO theater (theaterID, title, image, link, place, date, price, description) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"""
        record = (title, image, link, place, date, price, description)
        cursor.execute(insert, record)
        connection.commit()
    
print(f"All theater events added to database")
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
    