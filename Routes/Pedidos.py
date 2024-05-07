from flask import Blueprint,render_template,request,redirect,jsonify
from Utils.db import db
from Models.Clientes_Models import clientes
from Models.Platillos_Models import platillos

Pedidos=Blueprint('Pedidos',__name__)

@Pedidos.route('/InicioPedido', methods = ['GET'])
def InicioPedidos():
    return render_template('Pedidos/Inicio.html')

@Pedidos.route('/GenerarPedido', methods = ['GET'])
def GenerarPedidoGet():
    
        
    return render_template('Pedidos/Generar.html')


@Pedidos.route('/GetDishes', methods = ['POST'])
def GetDishes():
    Platillos=platillos.query.all()
    Platillos_Array=[]
    for Platillo in Platillos:
        Platillos_dict={
            'PlatilloID': Platillo.PlatilloID,
            'Nombre': Platillo.Nombre,
            'Precio': str(Platillo.Precio),
            'descripcion':Platillo.Descripcion
        }
        Platillos_Array.append(Platillos_dict)
    return jsonify({'data':Platillos_Array})


@Pedidos.route('/GetCustomer', methods = ['POST'])
def GetCustomer():   
    Clientes = clientes.query.all()
    clientes_array = []
    for cliente in Clientes:
        cliente_dict = {
            'nombre': cliente.Nombre,
            'cedula': cliente.Cedula,
            'telefono': cliente.Telefono,
            'direccion': cliente.Direccion,
        }
        clientes_array.append(cliente_dict)
    return jsonify({ 'data': clientes_array })