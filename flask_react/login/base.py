#!/usr/bin/python3
"""This will be our main project file, all our Python code will be in this file (Routes, MySQL connection, validation, etc)"""
from http import cookies
import json
from flask import Flask, jsonify, make_response, request
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from emailValidator import validar_email
import jwt
import uuid
import bcrypt

app = Flask(__name__)

# Clave de sesión Flask (para poder crear una cookie con la información de la sesión)
app.secret_key = 'PIN_key'

# Conexion con la Base de Datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'login'

# Inicializando MySQL
mysql = MySQL(app)

# Ruta para confirmacion de usuario existente (permitir ingreso)
@app.route('/login/auth', methods=['POST'])
def loginAuth():
    app.config['MYSQL_DB'] = 'login'
    # Tomar los datos de inicio de sesion (enviados desde el front)
    username = request.json.get('username')
    password = request.json.get('password')

    # Chequeo que los dos campos no esten vacios
    if username is not None and password is not None:
        # Inicio de sesion MySQL, obtenemos la informacion del usuario. Almacenada en la DB
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        pwd = cursor.fetchone()
        
        if pwd:
            # Codificando password en utf-8, para comprobar igualdad con encriptacion
            p = password.encode('utf-8')
            hashPWD = bcrypt.checkpw(p, pwd['password'].encode('utf-8'))

            # Chequeo coincidencia de contraseñas
            if hashPWD is True:
                # Encriptacion de usuraio e id con jwt para generar token
                UserID = pwd.get('UserID')
                token = jwt.encode({"username": username, "UserID": UserID}, "AEPINMM")
                # Seteando respuesta
                resp = make_response(jsonify(response={"status": "ok"}))
                resp.status_code = 200
                # Seteo de cookie en caso de usuario valido
                resp.set_cookie("cookie", token)
                return resp
            else:
                # Respuesta en caso de falla
                resp = make_response(jsonify(response={"status": "Invalid Credentials"}))
                return resp
        else:
            # Respuesta en caso de falla
            resp = make_response(jsonify(response={"status": "Invalid Credentials"}))
            return resp

# Ruta para chequear existencia de cookies    
@app.route('/login/check', methods=['GET'])
def loginCheck():
    app.config['MYSQL_DB'] = 'login'
    try:
        # Obtener la cookie generada en el login (si existe)
        existCookies = request.cookies.get('cookie')
        # Decodificacion de token para el chequeo de coincidencia
        existCookies = jwt.decode(existCookies, "AEPINMM")
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s AND UserID = %s', (existCookies.get('username'), existCookies.get('UserID')))
        user = cursor.fetchone()

        if user:
            return jsonify(response={"status": "Logeado"})
    except Exception:
        pass
    return jsonify(response={"status": "User no logeado"})

# Ruta para registrar un nuevo usuario  
@app.route('/register', methods=['POST'])
def loginRegister():
    app.config['MYSQL_DB'] = 'login'
    # Tomar los datos de registro (enviados desde el front)
    email = request.json.get('mail')
    username = request.json.get('username')
    password = request.json.get('password')
    msg = ''
    # Chequeo que los tres campos no esten vacios
    if username is not None and password is not None and email is not None:
        # Mensaje de error en caso de falla
        

        # Chequeo si es un usuario existente
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        user = cursor.fetchone()
        
        if user:
            msg = 'El usuario ya existe!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            # At least one or more non-@ , then a @ , then at least one or more non-@ , then a dot, then at least one or more non-@"
            msg = 'Direccion de correo invalida!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'El nombre de usuario debe contener solo caracteres y numeros!'
        elif not username or not password or not email:
            msg = 'Por favor complete todos los datos!'
        elif validar_email(email, debug=False) == False:
            msg = 'Email no valido!'
        else:
            # La cuenta no exite y los datos son validos para crear el nuevo usuario
            
            # Generando ID random
            UserID = str(uuid.uuid4())

            # Encriptacion de password
            pwd = password.encode('utf-8')
            salt = bcrypt.gensalt()
            hashPWD = bcrypt.hashpw(pwd, salt)
            # Almacenando datos de usuario en DB
            cursor.execute('INSERT INTO users VALUES (%s, %s, %s, %s)', (UserID, username, hashPWD, email,))
            # Guardando los cambios
            mysql.connection.commit()
            msg = 'Ok'
    else:
        msg = {"status": "Complete all data"}
    return jsonify(response={"status": msg})
    # return jsonify(response={"status": msg})

# Ruta para deslogear usuario, eliminacion de la cookie
@app.route('/login/logout', methods=['GET'])
def loginLogout():
    resp = make_response(jsonify(response={"status": "del success"}))
    # Eliminacion de la cookie
    resp.delete_cookie("cookie")
    return resp

@app.route('/newPWD', methods=['POST'])
def newPWD():
    app.config['MYSQL_DB'] = 'login'
    existCookies = request.cookies.get('cookie')
    # Decodificacion de token para el chequeo de coincidencia
    existCookies = jwt.decode(existCookies, "AEPINMM")
    print(existCookies)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE username = %s AND UserID = %s', (existCookies.get('username'), existCookies.get('UserID')))
    user = cursor.fetchone()
    print(user)

    if user:
        oldPassword = request.json.get('oldPassword')
        newPassword = request.json.get('newPassword')
        # Codificando password en utf-8, para comprobar igualdad con encriptacion
        p = oldPassword.encode('utf-8')
        hashPWD = bcrypt.checkpw(p, user['password'].encode('utf-8'))

        if hashPWD is True:
            pwd = newPassword.encode('utf-8')
            salt = bcrypt.gensalt()
            hashPWD = bcrypt.hashpw(pwd, salt)
            print(f"CONTRASEÑA EN DB = {user['password']}")
            # exe = f"UPDATE users SET password = {hashPWD} WHERE password = {user['password']}"
            cursor.execute('UPDATE users SET password = %s WHERE password = %s', (hashPWD, user['password']))
            mysql.connection.commit()
            return jsonify(response={"status": "Ok"})
        else:
            return jsonify(response={"status": "Old password invalid"})

@app.route('/data/<category>', methods=['POST', 'GET'])
def data(category):
    app.config['MYSQL_DB'] = 'events'

    categories = ['music', 'restaurant', 'theater', 'sport', 'dance', 'others', 'movie', 'party', 'brewery', 'coffee', 'museum']
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
        info['error'] = "Invalid category"
    return info

if __name__ == "__main__":
    """ Main Function """
app.run(host='0.0.0.0', port=5000, debug=True)