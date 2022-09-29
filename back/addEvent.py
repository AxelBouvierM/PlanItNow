#!/usr/bin/python3

import mysql.connector

connection = mysql.connector.connect(host='localhost', database='events', user='root', password='root')
cursor = connection.cursor()

insert = """INSERT INTO music (id, name, image, link, description, date, price, place) VALUES (2, %s, %s, %s, %s, %s, %s, %s)"""

record = ('Tiago', 'https://static.wikia.nocookie.net/rap/images/8/8c/Tiago_Imag_0025.jpg/revision/latest?cb=20210802194703&path-prefix=es', 'https://www.antelarena.com.uy/events/detail/tiago-pzk', 'Taigo ANTEL TEST', '02/08/22', '$100', 'Antel Arena')
cursor.execute(insert, record)
connection.commit()
if connection.is_connected():
    cursor.close()
    connection.close()
