#!/usr/bin/python3

import mysql.connector
from flask import Flask 

connection = mysql.connector.connect(host='localhost', database='events', user='root', password="AEPINMM")
cursor = connection.cursor(dictionary=True) 
app = Flask(__name__)
categories = ["brewery", "coffee", "dance", "movie", "museum", "music", "others", "party", "restaurant", "sport", "theater"]

@app.route("/data/<category>")
def data(category):
    if category not in categories:
        return ("Category not found")
    query = f"SELECT * FROM `{category}`"
    cursor.execute(query)
    data = cursor.fetchall()
    data_dict = {}
    id = category + "ID"
    for dic in data:
        data_dict[dic[id]] = dic
    return (data_dict)

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=True)