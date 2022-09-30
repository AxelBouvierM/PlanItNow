#!/usr/bin/python3

import mysql.connector

connection = mysql.connector.connect(host='localhost', database='events', user='root', password='root')
cursor = connection.cursor()
"""
ESTE FUNCIONA PARA INSERTAR EN TABLA CATEGORIAS
SACALE LOS BACKSLASH A LAS COMILLAS ABAJO PARA QUE LAS TOME JE
insert = "/"/"/INSERT INTO music (musicID, name, image, link, description, date, price, place) VALUES (2, %s, %s, %s, %s, %s, %s, %s)"/"/"/

record = ('Tiago', 'https://static.wikia.nocookie.net/rap/images/8/8c/Tiago_Imag_0025.jpg/revision/latest?cb=20210802194703&path-prefix=es', 'https://www.antelarena.com.uy/events/detail/tiago-pzk', 'Taigo ANTEL TEST', '02/08/22', '$100', 'Antel Arena')
"""
# Prueba para agregar con relacionamiento, si no funciona borralo a la mierda y lo vemos en la semana:)
insert = """INSERT INTO schedule (scheduleID, musicID, date, title) SELECT musicID FROM music VALUES (2, %s, %s)"""
record = ('02/08/22', 'Tiago Agenda Test')

cursor.execute(insert, record)
connection.commit()
if connection.is_connected():
    cursor.close()
    connection.close()
