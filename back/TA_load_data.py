#!/usr/bin/python3

from time import sleep
from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import datetime
import mysql.connector

DB_KEY = open('DB_KEY.txt').read() #open and save the mysql pass into a variable

connection = mysql.connector.connect(host='localhost', database='events', user='root', password=DB_KEY)
cursor = connection.cursor() 

categories = {"theater" : "https://tickantel.com.uy/inicio/buscar_categoria?2&cat_id=1", 
       "music" : "https://tickantel.com.uy/inicio/buscar_categoria?3&cat_id=2",
       "sport" : "https://tickantel.com.uy/inicio/buscar_categoria?4&cat_id=6", #The price information of it categorie does not work very well, decide if we eant to include it
       "dance" : "https://tickantel.com.uy/inicio/buscar_categoria?6&cat_id=10",
       "others" : "https://tickantel.com.uy/inicio/buscar_categoria?5&cat_id=7",
       }
for category in categories:
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('headless')
    driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
    driver.get(categories[category])

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
            if title != "Sin información":
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
            from_price = "Sin información visitar link del evento"
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
            info_place = soup.find(id="lugar")
            place = "Sin información"
            if info_place is not None:
                place = info_place.div.text.replace("\n","")
            if since_date == to_date:
                date = to_date
            else:
                date = f"Del {since_date} al {to_date}"
            if from_price == to_price:
                price = f"$ {to_price}"
            else:
                price = f"Desde $ {from_price} hasta $ {to_price}"
            insert = f"INSERT INTO {category} ({category}ID, title, image, link, place, date, price, description)"
            insert += " VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"
            record = (title, image, link, place, date, price, description)
            cursor.execute(insert, record)
            connection.commit()
    print(f"All {category} events added to database")
if connection.is_connected():
    cursor.close()
    connection.close()
driver.close()
