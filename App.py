from flask import Flask
from sqlalchemy import create_engine 
from Utils.db import db
import os
#importaciones de las rutas
from Routes.Clientes import Clientes
from Routes.Platillos import Platillos
from Routes.Proveedores import Proveedores
from Routes.Productos import Productos
from Routes.Pedidos import Pedidos
from Routes.ProductosCompra import ProductosCompra
from Routes.Empleados import Empleados
from Routes.Salario import SalarioEmpleados
from Routes.Finanzas import Finanzas


App = Flask(__name__) 

App.secret_key="secret key"
App.config['SQLALCHEMY_DATABASE_URI']="mysql+pymysql://root:password@localhost/comideria_deliciasdilcias4"
App.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db.init_app(App)

#registrando los blueprints de las rutas
App.register_blueprint(Clientes)
App.register_blueprint(Platillos)
App.register_blueprint(Proveedores)
App.register_blueprint(Productos)
App.register_blueprint(Pedidos)
App.register_blueprint(ProductosCompra)
App.register_blueprint(Empleados)
App.register_blueprint(SalarioEmpleados)    
App.register_blueprint(Finanzas)



#if __name__ == '__main__':
    #App.run(port = 3000, debug = True)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    App.run(host='0.0.0.0', port=port)

