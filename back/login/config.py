class Config:
    SECRET_KEY = 'los_pibes_de_la_salita'

class DevelopmentConfig(Config):
    DEBUG=True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'final'
    MYSQL_PASSWORD = 'proyectofinal'
    MYSQL_DB = 'FinalProject'

config={'development': DevelopmentConfig}