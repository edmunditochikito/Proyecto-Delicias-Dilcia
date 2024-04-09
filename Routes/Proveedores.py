from flask import Blueprint,render_template

Proveedores=Blueprint('Proveedores',__name__)

@Proveedores.route('/InicioProveedor', methods = ['GET'])
def InicioProveedor():
    return render_template('Proveedores/Inicio.html')

@Proveedores.route('/AgregarProveedor', methods = ['GET'])
def AgregarProveedoroGet():
    return render_template('Proveedores/Agregar.html')