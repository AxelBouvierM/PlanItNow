#!/usr/bin/python3
"""SingUp"""
import hashlib

def signup():
    email = input("Ingrese su email: ")
    pwd = input("Ingrese su contraseña: ")
    rep_pwd = input("Confirme su contraseña: ")

    if rep_pwd == pwd:
        encode = rep_pwd.encode()
        hash1 = hashlib.md5(encode).hexdigest()

        filename = "credenciales.txt"
        with open(filename, "w") as file:
            file.write(email + '\n')
            file.write(hash1)
        file.close()
        print("El usuario ha sido registrado")

    else:
        print("Su contraseña no coincide, vuelva a ingresarla")
