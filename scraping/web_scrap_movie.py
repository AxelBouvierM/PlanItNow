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
    duration = ""
    genre = ""
    actors = ""
    print(f"{counter}-Title: {title}")
    print(f"Image: {image}")
    print(f"Link: https://www.movie.com.uy/{link[1:]}")
    print(f"Genre: {genre}")
    print(f"Duration: {duration}")
    print(f"Actors: {actors}")