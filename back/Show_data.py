#!/usr/bin/python3
"""Send data to API"""
from flask import Flask, request
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

DB_KEY = open('/home/planitnow_pin/PlanItNow/back/DB_KEY.txt').read().replace("\n","") #open and save the mysql pass into a variable 

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = DB_KEY
app.config['MYSQL_DB'] = 'events'

mysql = MySQL(app)

@app.route('/data/<category>', methods=['POST', 'GET'])
def data(category):
    categories = ['music', 'restaurant', 'theater', 'sport', 'dance', 'others', 'movie', 'party', 'brewery', 'coffee', 'museum', 'entertainment']
    info = {}
    if category in categories:
        
        insert = f"SELECT * FROM {category}"
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(insert)
        # Fetch one record and return result
        data = cursor.fetchall()
        
        id = category + 'ID'
        
        for elements in data:
            info[elements[id]] = elements
    else:
        info['error'] = "Categoria inexistente"
    return info

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)