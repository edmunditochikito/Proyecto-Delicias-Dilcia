from flask import Blueprint,render_template

Clientes=Blueprint('Clientes',__name__)

@Clientes.route('/InicioCliente', methods = ['GET'])
def InicioCliente():
    return render_template('Clientes/Inicio.html')

@Clientes.route('/AgregarCliente', methods = ['GET'])
def AgregarClienteGet():
    return render_template('Clientes/Agregar.html')