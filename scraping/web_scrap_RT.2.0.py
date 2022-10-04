#!/usr/bin/python3

from selenium import webdriver
from bs4 import BeautifulSoup
from sys import argv
from time import sleep

results = ""
categoria = {"Teatro" : "https://redtickets.uy/busqueda?*,6,0", 
       "Musica" : "https://redtickets.uy/busqueda?*,3,0",
       "Fiestas" : "https://redtickets.uy/busqueda?*,9,0",
       "Futbol" : "https://redtickets.uy/busqueda?*,8,0",
       "Deportes" : "https://redtickets.uy/busqueda?*,2,0",
       "Otros" : "https://redtickets.uy/busqueda?*,7,0",
       }

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')
driver = webdriver.Chrome('/home/vagrant/PlanItNow/scraping/chromedriver', options=chrome_options)
url = categoria[argv[1]]
page = 0
counter = 0
while True: 
       driver.get(url)
       html = driver.page_source
       soup = BeautifulSoup(html, 'lxml')
       results = soup.find_all("main", class_="cards")[0]
       if len(results) == 1:
              break
       events = results.find_all("article", class_="card")
       for event in events:
              print("==================================")
              span_list = event.find_all("span")
              title = span_list[0].text
              image = f"https://redtickets.uy/" + event.img['data-src']
              link = f"https://redtickets.uy/" + event.a['href']
              date = span_list[1].text
              location = span_list[2].text 
              description = ""
              check_price = ""
              iterations = 0
              while check_price == "":
                     driver.get(link)
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
                            price = "Consultar en el link del evento"
                            break
              counter += 1
              print(f"{counter}-Title: {title}")
              print(f"Image: {image}")
              print(f"Link: {link}")
              print(f"Date: {date}")
              print(f"Location: {location}")
              print(f"Precio: {price}")
              print(f"Description: {description}")
              print("==================================")
       page += 1
       url = categoria[argv[1]].replace("0", str(page))
driver.close()
