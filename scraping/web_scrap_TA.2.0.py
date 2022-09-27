#!/usr/bin/python3

from distutils.log import info
from time import sleep
from selenium import webdriver
from bs4 import BeautifulSoup
from sys import argv
import requests
import datetime

categoria = {"Teatro" : "https://tickantel.com.uy/inicio/buscar_categoria?2&cat_id=1", 
       "Musica" : "https://tickantel.com.uy/inicio/buscar_categoria?3&cat_id=2",
       "Deportes" : "https://tickantel.com.uy/inicio/buscar_categoria?4&cat_id=6", #The price information of it categorie does not work very well, decide if we eant to include it
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
counter = 1
for show_element in show_elements:
    image = show_element.img['src']
    link = "https://tickantel.com.uy/inicio" + show_element.a['href'][1:]
    html = requests.get(link)
    soup = BeautifulSoup(html.content, 'html.parser')
    info_espectaculo = soup.find(id="espectaculo") # in this tag we got information about the Title and date of the event
    title = "Sin información"
    since_date = "Sin información"
    to_date = since_date
    if info_espectaculo is not None:
        title= info_espectaculo.find("h1", class_="title").find("span", class_="span-block").text
        span_list = (info_espectaculo.find("h1",class_="title").find_all("span"))
        if "del" in span_list[0]:
            since_date = span_list[1].text
            to_date = span_list[3].text
        elif "hasta el" in span_list[0]:
            since_date = datetime.datetime.now().strftime("%d/%m/%Y")
            to_date = span_list[1].text
        else:
            since_date = span_list[0].text
            to_date = since_date
    info_price = soup.find_all("div", class_="espectaculo-item")
    from_price = "Sin información"
    to_price = from_price
    if info_price != []:
        try:
            span_list = info_price[2].find_all("span")
        except IndexError:
            pass
        if span_list != []:
            if "Precio de las entradas:" == span_list[0].text:
                from_price = span_list[2].text
                to_price = span_list[3].text 
                price = "Desde $" + from_price + " hasta $" + to_price 
            else:
                from_price = span_list[0].text
                to_price = from_price
    info_description = soup.find(id="tab-informacion")
    description = "Sin información"
    if info_description is not None:
        description = info_description.contents[1].text
    info_location = soup.find(id="lugar")
    Location = "Sin información"
    if info_location is not None:
        location = info_location.div.text.replace("\n","")
    print("==================================")
    print(f"{counter}-Evento: {title}")
    counter += 1
    print(f"Imagen: {image}")
    print(f"Link: {link}")
    if since_date == to_date:
        print(f"Fecha: {to_date}")
    else:
        print(f"Fecha: del {since_date} al {to_date}")
    print(f"Lugar: {location}")
    if from_price == to_price:
        print(f"Precio: $ {to_price}")
    else:
        print(f"Precio: desde $ {from_price} hasta $ {to_price}")
    print(f"Descripción: {description}")
    print("==================================")
driver.close()
