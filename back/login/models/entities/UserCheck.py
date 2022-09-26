from werkzeug.security import check_password_hash, generate_password_hash

class User():
    def __init__(self, id, email, password, first_name, last_name) -> None:
        self.id = id
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name

    @classmethod
    def check_password(slef, hashed_password, password):
        print(check_password_hash(hashed_password, password))
        return check_password_hash(hashed_password, password)

print(generate_password_hash("test"))