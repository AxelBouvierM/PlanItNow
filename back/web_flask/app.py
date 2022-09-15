#!/usr/bin/python3
"""App Code"""

from urllib import request
from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def api():
    dns = "https://jsonplaceholder.typicode.com/comments"
    lista = []
    for cont in requests.get(dns).json():
        for key, value in cont.items():
            if key == id and value == "494":
                print("hola")
                lista.append()
    return jsonify(lista)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)