from flask import Flask 
from Utils.db import db
#importaciones de las rutas
from Routes.Clientes import Clientes
from Routes.Platillos import Platillos
from Routes.Proveedores import Proveedores
from Routes.Productos import Productos


App = Flask(__name__) 


App.config['SQLALCHEMY_DATABASE_URI']="mysql+pymysql://root:password@localhost/Comideria3"
App.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db.init_app(App)

#registrando los blueprints de las rutas
App.register_blueprint(Clientes)
App.register_blueprint(Platillos)
App.register_blueprint(Proveedores)
App.register_blueprint(Productos)



if __name__ == '__main__':
    App.run(port = 3000, debug = True)