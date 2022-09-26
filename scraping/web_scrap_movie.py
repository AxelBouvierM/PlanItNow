#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests
from selenium import webdriver


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')
driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
driver.get('https://www.movie.com.uy/movies')
lxml = driver.page_source
soup = BeautifulSoup(lxml, 'lxml')
html = str(soup.contents[0])
soup = BeautifulSoup(html, 'lxml')
results = soup.find("div", class_="content") 
movie_elements = results.find_all("div", class_="row alternate")
counter = 0
for movie_element in movie_elements:
    counter += 1
    title = str(movie_element.h2.a).split(">")[1].split("<")[0]
    image = movie_element.img['src']
    link = movie_element.a['href']
    link = "https://www.movie.com.uy/" + movie_element.a['href'][1:]
    p_list = movie_element.find_all('div', class_="col-lg-6 col-md-6 col-sm-6 col-xs-6")
    duration = p_list[0].text.replace("\n","").split("Duración")[1]
    director = p_list[1].text.replace("\n","").split("Director")[1]
    genre = p_list[2].text.replace("\n","").split("Género")[1]
    actors = p_list[3].text.replace("\n","").split("Actores")[1]
    locations = movie_element.ul.text.replace("\n","").replace("Movie", " Movie").replace("VER", " VER")[1:]
    print(f"{counter}-Title: {title}")
    print(f"Image: {image}")
    print(f"Link: {link}")
    print(f"Director: {director}")
    print(f"Genre: {genre}")
    print(f"Duration: {duration}")
    print(f"Actors: {actors}")
    print(f"Locations: {locations}")
    