from flask import Blueprint, render_template, request, jsonify
from Utils.db import db
from Models.Clientes_Models import clientes
from Models.Platillos_Models import platillos
from Models.Pedidos_Models import PedidosClientes
from Models.DetallePedidos_Models import detallePedidoCliente
from sqlalchemy import text
import json
import logging
from datetime import datetime

Pedidos = Blueprint('Pedidos', __name__)

@Pedidos.route('/InicioPedido', methods=['GET'])
def InicioPedidos():
    return render_template('Pedidos/Inicio.html')

@Pedidos.route('/dtOrders', methods=['GET'])
def DataTable():
    Pedidos = PedidosClientes.query.all()
    Pedidos_Array = []
    for Pedido in Pedidos:
        Pedidos_dict = {
            'pedidoID': Pedido.PedidoID,
            'clienteID': Pedido.ClienteID,
            'nombreCliente': Pedido.ClienteNombre,
            'fechaPedido': Pedido.FechaPedido,
            'total': Pedido.Total,
            #'platilloID': Pedido.PlatilloID,
            #'cantidad': Pedido.Cantidad,
            #'estadoPago': Pedido.EstadoPago
        }
        Pedidos_Array.append(Pedidos_dict)
    return jsonify({'data': Pedidos_Array})

@Pedidos.route('/GenerarPedido', methods=['GET'])
def GenerarPedidoGet():
    return render_template('Pedidos/Generar.html')

@Pedidos.route('/GetDishes', methods=['POST'])
def GetDishes():
    Platillos = platillos.query.all()
    Platillos_Array = []
    for Platillo in Platillos:
        Platillos_dict = {
            'platilloID': Platillo.PlatilloID,
            'nombre': Platillo.Nombre,
            'precio': str(Platillo.Precio),
            'descripcion': Platillo.Descripcion,
            'estado': Platillo.EstadoPlatillo
        }
        Platillos_Array.append(Platillos_dict)
    return jsonify({'data': Platillos_Array})

@Pedidos.route('/GetCustomer', methods=['POST'])
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
    return jsonify({'data': clientes_array})

logging.basicConfig(level=logging.DEBUG)

@Pedidos.route('/GenerarPedidos', methods=['POST'])
def GenerarPedidos():
    datos_formulario = request.json
    
    cedula = str(datos_formulario.get('CedulaP'))
    p_Platillos = datos_formulario.get('platillos')
    fecha = datos_formulario.get('fecha_pedido')
    fecha_pedido = datetime.strptime(fecha, '%Y-%m-%d').date()
     # Convertir los valores de 'Cantidad' y 'PlatilloID' a enteros
    try:
        for platillo in p_Platillos:
            platillo['Cantidad'] = int(platillo['Cantidad'])
            platillo['PlatilloID'] = int(platillo['PlatilloID'])
    except (ValueError, TypeError) as e:
        logging.error(f"Error al convertir valores a enteros: {str(e)}")
        return jsonify({'error': 'Los valores de Cantidad y PlatilloID deben ser enteros'}), 400 
    
    platillos_json = json.dumps(p_Platillos)
    
    logging.debug(f"Cédula: {cedula}")
    logging.debug(f"Platillos JSON: {platillos_json}")
    logging.debug(f"Fecha Pedido: {fecha_pedido}")
    
    try:
        generar_pedido(cedula, platillos_json, fecha_pedido)
        return jsonify({'data': 'El pedido se realizo con exito'})
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

def generar_pedido(cedula, platillos, fecha_pedido):
    logging.debug(f"Llamando a procedimiento con: {cedula}, {platillos}, {fecha_pedido}")
    print(cedula,platillos,fecha_pedido)
    
    sql = """
    CALL GenerarPedido(:p_ClienteID, :p_Platillos, :p_FechaPedido);
    """
    try:
        with db.engine.connect() as con:
            con.execute(text(sql), {
                'p_ClienteID': cedula,
                'p_Platillos': platillos,
                'p_FechaPedido': fecha_pedido
            })
    except Exception as e:
        logging.error(f"Error ejecutando procedimiento almacenado: {str(e)}")
        raise


@Pedidos.route('/DetallePedidos', methods=['GET'])
def DetallePedidos():
    return render_template('Pedidos/Detalle.html')

@Pedidos.route('/dtOrdersDetail', methods=['GET'])
def DataTables():
    Pedidos = detallePedidoCliente.query.all()
    Pedidos_Array = []
    for Pedido in Pedidos:
        Pedidos_dict = {
            'DetallePedidoID': Pedido.DetallePedidoID,
            'PedidoID': Pedido.PedidoID,
            'ClienteID': Pedido.ClienteID,
            'ClienteNombre': Pedido.ClienteNombre,
            'PlatilloID': Pedido.PlatilloID,
            'PlatilloNombre': Pedido.PlatilloNombre,
            'PrecioUnitario': Pedido.PrecioUnitario,
            'Cantidad': Pedido.Cantidad,
            'PrecioTotal':Pedido.PrecioTotal,
            'EstadoPago':Pedido.EstadoPago,
            'Fecha': Pedido.Fecha
        }
        Pedidos_Array.append(Pedidos_dict)
    return jsonify({'data': Pedidos_Array})
