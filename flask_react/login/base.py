#!/usr/bin/python3
"""This will be our main project file, all our Python code will be in this file (Routes, MySQL connection, validation, etc)"""
from flask import Flask, request
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from emailValidator import validar_email

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

# Ruta para obtener data desde el front
@app.route('/loginData', methods=['POST', 'GET'])
def loginData():
    # msj de error
    msg = {}
    """
    try:
        username = request.json['username']
        password = request.json['password']
    except Exception:
        return "No hay donde hacer request"
    """
    
    # Usuario existente para prueba sin hacer request de arriba
    username = "test"
    password = "test"

    if request.method == 'GET' and username is not None and password is not None:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
        # Fetch one record and return result
        user = cursor.fetchone()
        if user:
            msg['logged'] = 'True'
            return msg
        else:
            msg['logged'] = 'False'
            return msg
    elif request.method == 'POST':
        # Proceso de registro
        try:
            email = request.json['email']
        except Exception:
            return "No hay data"
        if username is not None and password is not None and email is not None:
            # Mensaje de error en caso de falla
            msg = {}
            if request.method == 'POST':
                msg['error'] = 'Por favor complete todos los datos!'

            # Chequeo si existe ya existe
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
            user = cursor.fetchone()
        
            if user:
                msg['error'] = 'El usuario ya existe!'
            elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                # At least one or more non-@ , then a @ , then at least one or more non-@ , then a dot, then at least one or more non-@"
                msg['error'] = 'Direccion de correo invalida!'
            elif not re.match(r'[A-Za-z0-9]+', username):
                msg['error'] = 'El nombre de usuario debe contener solo caracteres y numeros!'
            elif not username or not password or not email:
                msg['error'] = 'Por favor complete todos los datos!'
            elif validar_email(email, debug=False) == False:
                msg['error'] = 'Email no valido!'
            else:
                # La cuenta no exite y los datos son validos para crear el nuevo usuario
                cursor.execute('INSERT INTO users VALUES (NULL, %s, %s, %s)', (username, password, email,))
                # Guardando los cambios
                mysql.connection.commit()
                msg['registro'] = 'True'
            return msg

"""
@app.route('/login/', methods=['GET', 'POST'])
def login():
    # Mensaje de error en caso de falla
    msg = ''

    # Chequeo si existen username y password en solicitud 'POST' (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        # Chequeo si existe usuario MySQL
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
        # Fetch one record and return result
        user = cursor.fetchone()

        # Si la cuenta existe en la tabla de usuarios de la Base de Datos
        if user:
            # Creando session de datos, para acceder a ellos en otras rutas
            session['loggedin'] = True
            session['id'] = user['id']
            session['username'] = user['username']

            # Momentaneo (luego redireccion a pagina principal)
            return 'Inicio de sesion valido'
        else:
            msg = 'Usuario o contraseña incorrecto'
    return render_template('index.html', msg=msg)

@app.route('/login/logout')
def logout():
    # Borrando informacion de la sesion
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)

    # Redireccion a login
    return redirect(url_for('login'))

@app.route('/login/register', methods=['GET','POST'])
def register():
    # Mensaje de error en caso de falla
    msg = ''
     # Chequeo si existen username, password y email en solicitud 'POST' (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        # Chequeo si existe ya existe
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
            cursor.execute('INSERT INTO users VALUES (NULL, %s, %s, %s)', (username, password, email,))
            # Guardando los cambios
            mysql.connection.commit()
            msg = 'Su registro se completo con exito!'    
    elif request.method == 'POST':
        msg = 'Por favor complete todos los datos!'
    return render_template('register.html', msg=msg)
"""
if __name__ == "__main__":
    """ Main Function """
app.run(host='0.0.0.0', port=5000, debug=True)