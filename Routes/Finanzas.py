from flask import Blueprint,render_template,request,redirect,jsonify
from Models.Ingresos import ingresos
from Models.Egresos import egresos
from sqlalchemy import text
from Utils.db import db

Finanzas = Blueprint('Finanzas', __name__)

@Finanzas.route('/InicioEgresos', methods=['GET'])
def InicioEgresos():
    return render_template('Finanzas/Egresos.html')


@Finanzas.route('/dtEgresos', methods = ['GET'])
def datatable():   
    Egresos = egresos.query.all()
    egresos_array = []
    for egreso in Egresos:
        egreso_dict = {
            'EgresoID': egreso.EgresoID,
            'TipoEgreso': egreso.TipoEgreso,
            'Monto': egreso.Monto,
            'FechaEgreso': egreso.FechaEgreso,
            'Descripcion': egreso.Descripcion,
            #'SalarioID': egreso.SalarioID,
           # 'ProveedorID': egreso.ProveedorID,
            'TipoGasto': egreso.TipoGasto,
        }
        egresos_array.append(egreso_dict)
    return jsonify({ 'data': egresos_array })


@Finanzas.route('/InicioIngresos', methods=['GET'])
def InicioIngresos():
    return render_template('Finanzas/Ingresos.html')    

@Finanzas.route('/dtIngresos', methods = ['GET'])
def datatable2():   
    Ingresos = ingresos.query.all()
    ingresos_array = []
    for ingreso in Ingresos:
        ingreso_dict = {
            'IngresoID': ingreso.IngresoID,
            'ClienteID': ingreso.ClienteID,
            'PedidoID': ingreso.PedidoID,
            'Monto': ingreso.Monto,
            'FechaIngreso': ingreso.FechaIngreso,
            'Descripcion': ingreso.Descripcion,
            'TipoIngreso': ingreso.TipoIngreso,
        }
        ingresos_array.append(ingreso_dict)
    return jsonify({ 'data': ingresos_array })
