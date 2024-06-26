from flask import Flask, jsonify, render_template,blueprints
from Utils.db import db
from Models.Clientes_Models import clientes
from Models.Platillos_Models import platillos
from Models.DetallePedidos_Models import detallePedidoCliente

Reportes = blueprints.Blueprint('Reportes', __name__)

@Reportes.route('/Reportes', methods=['GET'])
def ReportesGET():
   

    return render_template('Reportes/Reportes.html')



@Reportes.route('/ReportesPOST', methods=['POST'])
def ReportesPOST():
    clientes_mas_piden = db.session.query(
        clientes.Nombre,db.func.sum(detallePedidoCliente.PrecioTotal).label('cantidad')
    ).join(detallePedidoCliente, clientes.Cedula == detallePedidoCliente.ClienteID).group_by(clientes.Nombre).order_by(db.desc('cantidad')).limit(5).all()
    print(clientes_mas_piden)

    clientes_mas_piden = [{'Nombre': cliente, 'cantidad': cantidad} for cliente, cantidad in clientes_mas_piden]
    print(clientes_mas_piden)
    platillos_mas_piden = db.session.query(
        platillos.Nombre, db.func.sum(detallePedidoCliente.Cantidad).label('cantidad')
    ).join(detallePedidoCliente, platillos.PlatilloID == detallePedidoCliente.PlatilloID).group_by(platillos.Nombre).order_by(db.desc('cantidad')).limit(5).all()

    platillos_mas_piden = [{'Nombre': platillo, 'cantidad': cantidad} for platillo, cantidad in platillos_mas_piden]

    return jsonify({"platillos_mas_piden": platillos_mas_piden, "clientes_mas_piden": clientes_mas_piden})