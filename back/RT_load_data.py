#!/usr/bin/python3

from socket import CAN_RAW
from selenium import webdriver
from bs4 import BeautifulSoup
from sys import argv
from time import sleep
import mysql.connector

results = ""
categories = {
       "party" : "https://redtickets.uy/busqueda?*,9,0",
       "sport" : "https://redtickets.uy/busqueda?*,8,0",
       "sport2" : "https://redtickets.uy/busqueda?*,2,0",
       "others" : "https://redtickets.uy/busqueda?*,7,0",
       "music" : "https://redtickets.uy/busqueda?*,3,0",
       "theater" : "https://redtickets.uy/busqueda?*,6,0",
       }

for category in categories:
    connection = mysql.connector.connect(host='localhost', database='events', user='root', password='root')
    cursor = connection.cursor()   

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('headless')
    driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
    url = categories[category]
    page = 0
    while True: 
        driver.get(url)
        html = driver.page_source
        soup = BeautifulSoup(html, 'lxml')
        results = soup.find_all("main", class_="cards")[0]
        if len(results) == 1:
            break
        events = results.find_all("article", class_="card")
        for event in events:
            span_list = event.find_all("span")
            title = span_list[0].text
            image = f"https://redtickets.uy/" + event.img['data-src']
            link = f"https://redtickets.uy/" + event.a['href']
            date = span_list[1].text
            place = span_list[2].text 
            description = ""
            check_price = ""
            iterations = 0
            while check_price == "":
                driver.get(link)
                if category == "theater":
                    sleep(5)
                else:
                    sleep(1)
                html = driver.page_source
                soup = BeautifulSoup(html, 'lxml')
                event_info =soup.find("div", class_="TableEventInfo")
                description_list = event_info.find_all("div", class_="Description")
                description = description_list[1].text
                date = description_list[0].text
                soup = BeautifulSoup(html, 'lxml')
                purchase_info =soup.find("div", class_="SectionPurchase")
                check_price = purchase_info.find(id="comboTicket").text[1:]
                iterations += 1
                price = purchase_info.find(id="comboTicket").text[1:].replace("(","").replace(") ","\n").replace("Elige tu entrada  ", "")
                if iterations == 5:
                    price = "Sin información visitar link del evento"
                    break
            category_id = category
            if category_id == "sport2":
                category_id = "sport"
            insert = f"INSERT INTO {category_id} ({category_id}ID, title, image, link, place, date, price, description)"
            insert += " VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)"
            record = (title, image, link, place, date, price, description)
            cursor.execute(insert, record)
            connection.commit()
        page += 1
        url = categories[category].replace("0", str(page))
    print(f"All {category} events added to database")
driver.close()
