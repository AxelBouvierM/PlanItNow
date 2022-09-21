#!/usr/bin/python3
"""SingUp"""

import hashlib
import getpass

def login():
    email = input("Ingrese su email: ")
    pwd = getpass.getpass("Ingrese su contraseña: ")

    auth = pwd.encode()
    auth_hash = hashlib.md5(auth).hexdigest()

    filename = "credenciales.txt"
    with open(filename, "r") as file:
        email_stored, pwd_sotred = file.read().split('\n')
    file.close()

    if email == email_stored and auth_hash == pwd_sotred:
        print("Acceso permitido")
    else:
        print("Acceso denegado")