from flask import Blueprint, render_template, request, jsonify
from Utils.db import db
from Models.Productos_Compra_models import productosCompra
import json
import logging
from datetime import datetime
from sqlalchemy import text

ProductosCompra = Blueprint('ProductosCompra', __name__)

@ProductosCompra.route('/InicioCompras', methods=['GET'])
def InicioCompras():
    return render_template('Compras/Inicio.html')


@ProductosCompra.route('/dtCompras', methods=['GET'])
def DataTable():
    compras = productosCompra.query.all()
    Compras_Array = []
    for compra in compras:
        compras_dict = {
            'ProductoCompraID': compra.ProductoCompraID,
            'CompraID': compra.CompraID,
            'ProductoID': compra.ProductoID,
            'Cantidad': compra.Cantidad,
            'PrecioUnitario': compra.PrecioUnitario,
        }
        Compras_Array.append(compras_dict)
    return jsonify({'data': Compras_Array})



@ProductosCompra.route('/GenerarCompras', methods=['POST'])
def GenerarCompras():
    datos_formulario = request.json
    proveedor_id = datos_formulario['proveedor_id']
    productos = datos_formulario['productos']
    fecha = datos_formulario.get('fecha_pedido')
    fecha_pedido = datetime.strptime(fecha, '%Y-%m-%d').date()
    
    try:
        for producto in productos:
            producto['Cantidad'] = int(producto['Cantidad'])
            producto['ProductoID'] = int(producto['ProductoID'])
    except (ValueError, TypeError) as e:
        logging.error(f"Error al convertir valores a enteros: {str(e)}")
        return jsonify({'error': 'Los valores de Cantidad y ProductoID deben ser enteros'}), 400 
    
    productos_json = json.dumps(productos)
    print(productos_json)
    
    try:
        realizar_pedido_proveedor(proveedor_id, productos_json, fecha_pedido)
        return jsonify({'data': 'La compra se realizo con exito'})
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

def realizar_pedido_proveedor(proveedor_id, productos, fecha_pedido):
    logging.debug(f"Llamando a procedimiento con: {proveedor_id}, {productos}, {fecha_pedido}")
    print(proveedor_id, productos, fecha_pedido)
    
    sql = """
    CALL RealizarPedidoProveedor(:p_ProveedorID, :p_Productos, :p_FechaPedido);
    """
    try:
        with db.engine.connect() as con:
            con.execute(text(sql), {
                'p_ProveedorID': proveedor_id,
                'p_Productos': productos,
                'p_FechaPedido': fecha_pedido
            })
    except Exception as e:
        logging.error(f"Error ejecutando procedimiento almacenado: {str(e)}")
        raise
