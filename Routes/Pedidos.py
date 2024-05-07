from flask import Blueprint,render_template,request,redirect,jsonify
from Utils.db import db
from Models.Clientes_Models import clientes
from Models.Platillos_Models import platillos
from Models.Pedidos_Models import PedidosClientes
from sqlalchemy import text

from datetime import datetime
Pedidos=Blueprint('Pedidos',__name__)

@Pedidos.route('/InicioPedido', methods = ['GET'])
def InicioPedidos():
    return render_template('Pedidos/Inicio.html')

@Pedidos.route('/dtOrders', methods = ['GET'])
def DataTable():
    Pedidos=PedidosClientes.query.all()
    Pedidos_Array=[]
    for Pedido in Pedidos:
        Pedidos_dict={
            'pedidoID':Pedido.PedidoID ,
            'clienteID':Pedido.ClienteID,
            'fechaPedido': Pedido.FechaPedido,
            'total': Pedido.Total,
            'platilloID':Pedido.PlatilloID,
            'cantidad':Pedido.Cantidad,
            'estadoPago':Pedido.EstadoPago
        }
        Pedidos_Array.append(Pedidos_dict)
    return jsonify({'data':Pedidos_Array})

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

@Pedidos.route('/GenerarPedidos', methods=['POST'])
def GenerarPedidos():
    datos_formulario = request.json
    
    # Acceder a los datos individualmente
    cedula = datos_formulario.get('CedulaP')
    id_platillo = datos_formulario.get('IdPlatillo')
    cantidad = datos_formulario.get('cantidad')
    fecha_pedido = datos_formulario.get('fecha_pedido')
    estado = datos_formulario.get('estado')
    
    
    # Convertir los tipos de datos según sea necesario
    try:
        id_platillo = int(id_platillo)
        cantidad = int(cantidad)
        fecha_pedido = datetime.strptime(fecha_pedido, '%Y-%m-%d').date()
    except ValueError:
        # Manejar errores de conversión de tipos de datos
        return jsonify({'error': 'Error en los tipos de datos'})
    
    # Llamar al procedimiento almacenado
    generar_pedido(cedula, id_platillo, cantidad, fecha_pedido, estado)
    
    return jsonify({'data': fecha_pedido})

def generar_pedido(cliente_id, platillo_id, cantidad, fecha_pedido, estado_pago):
    sql = """
    CALL GenerarPedido(:cliente_id, :platillo_id, :cantidad, :fecha_pedido, :estado_pago);
    """
    with db.engine.connect() as con:
        con.execute(text(sql), {
            'cliente_id': cliente_id,
            'platillo_id': platillo_id,
            'cantidad': cantidad,
            'fecha_pedido': fecha_pedido,
            'estado_pago': estado_pago
        })