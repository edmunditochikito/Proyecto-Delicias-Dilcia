from flask import Blueprint,render_template

Productos=Blueprint('Productos',__name__)

@Productos.route('/InicioProducto', methods = ['GET'])
def InicioProducto():
    return render_template('Productos/Inicio.html')

@Productos.route('/AgregarProducto', methods = ['GET'])
def AgregarProductooGet():
    return render_template('Productos/Agregar.html')
