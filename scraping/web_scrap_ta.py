#!/usr/bin/python3

from time import sleep
from selenium import webdriver
from bs4 import BeautifulSoup
from sys import argv
import requests

categoria = {"Teatro" : "https://tickantel.com.uy/inicio/buscar_categoria?2&cat_id=1", 
       "Musica" : "https://tickantel.com.uy/inicio/buscar_categoria?3&cat_id=2",
       "Deportes" : "https://tickantel.com.uy/inicio/buscar_categoria?4&cat_id=6",
       "Danza" : "https://tickantel.com.uy/inicio/buscar_categoria?6&cat_id=10",
       "Otros" : "https://tickantel.com.uy/inicio/buscar_categoria?5&cat_id=7",
       }
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')
driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
driver.get(categoria[argv[1]])

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

scroll_limit = 50 # If we want to set up the limit of number of scroll loads

count = 0
while True and count < scroll_limit:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    sleep(1) #sleep time for the page to load on scroll

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
    count += 1

html = driver.page_source
soup = BeautifulSoup(html, 'lxml')
results = soup.find("section", class_="resultados") 
show_elements = results.find_all("div", class_="item")
counter = 0
for show_element in show_elements:
    title = show_element.img['alt']
    image = show_element.img['src']
    link = "https://tickantel.com.uy/inicio" + show_element.a['href'][1:]
    span_list = show_element.find_all("span")
    if "del" in span_list[0]:
        since_date = span_list[1].text
        to_date = span_list[3].text
        date = since_date + ' - ' + to_date
        location = span_list[5].text
        if location == title:
            location = span_list[6].text
    else:
        date = span_list[0].text
        try:
            location = span_list[2].text
            if location == title:
                location = span_list[3].text
        except IndexError:
            location = "No information"
    html = requests.get(link)
    soup = BeautifulSoup(html.content, 'html.parser')
    show_info = soup.find("div", class_="tab-content")
    show_description = soup.find(id="tab-informacion")
    description = "No description"
    if show_description is not None:
        description = show_description.contents[1].text
    print("==================================")
    print(f"{counter}-Title: {title}")
    counter += 1
    print(f"Image: {image}")
    print(f"Link: {link}")
    print(f"Date: {date}")
    print(f"Location: {location}")
    print(f"Description: {description}")
    print("==================================")
driver.close()