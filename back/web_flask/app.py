#!/usr/bin/python3
"""App Code"""
from curses.ascii import alt
import requests
import mechanicalsoup
from bs4 import BeautifulSoup
import csv


browser = mechanicalsoup.StatefulBrowser()
url = "https://tickantel.com.uy/inicio/buscar_categoria?4&cat_id=6"
"""response = requests.get(url)
html = BeautifulSoup(response.content, 'html.parser')
print(html)
r = html.find(id="id15")
img_html = r.find_all("div", class_="item")"""
page = browser.open(url)

print(page.soup)
"""
imgs = []
for element in img_html:
    name = element.img['alt']
    image = element.img['src']
    link = element.a['href'].replace(".", "")
    print(f"Name: {name}")
    print(f"Image: {image}")
    print(f"Link: https://tickantel.com.uy/inicio{link}")
"""