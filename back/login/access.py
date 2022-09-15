#!/usr/bin/python3
"""SingUp"""

import hashlib
from login import login
from signup import signup

while True:
    print("################### Login ###################")
    print("1 - Login")
    print("2 - Signup")
    print("3 - Exit")

    ing = int(input("Ingrese su opcion: "))

    if ing == 1:
        login()
    elif ing == 2:
        signup()
    elif ing == 3:
        break
    else:
        print("Opcion no valida")