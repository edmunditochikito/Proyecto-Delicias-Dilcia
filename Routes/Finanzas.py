from flask import Blueprint,render_template,request,redirect,jsonify, url_for
from Models.Ingresos import ingresos
from Models.Egresos import egresos
from sqlalchemy import text
from Utils.db import db


import base64


Finanzas = Blueprint('Finanzas', __name__)

@Finanzas.route('/InicioEgresos', methods=['GET'])
def InicioEgresos():
    return render_template('Finanzas/Egresos.html')

@Finanzas.route('/RegistrarEgresos', methods=['GET'])
def RegistrarIngresos():
    return render_template('Finanzas/Registrar_egresos.html')


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
            'ArchivoEvidencia':base64.b64encode(egreso.ArchivoEvidencia).decode('utf-8') if egreso.ArchivoEvidencia else None,
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


@Finanzas.route('/RegistrarEgresos', methods=['POST'])
def RegistrarEgresosPOST():
    try:
        datos_formulario = request.json
        tipo_egreso = datos_formulario.get('TipoDeEgreso')
        monto = datos_formulario.get('Monto')
        fecha_egreso = datos_formulario.get('Fecha')
        descripcion = datos_formulario.get('Descripcion')
        tipo_gasto = datos_formulario.get('TipoDeGasto')
        archivo_evidencia = datos_formulario.get('Evidencia')
        
        
        agregar_egreso(tipo_egreso, monto, fecha_egreso, descripcion, tipo_gasto, archivo_evidencia)
        return jsonify({'data':"Egreso registrado correctamente."})
    except KeyError as e:
     return jsonify({'data': f"Error: {e}. Campo faltante en el formulario."})   
 

    

def agregar_egreso(tipo_egreso, monto, fecha_egreso, descripcion, tipo_gasto, archivo_evidencia):
   
    print(tipo_egreso, monto, fecha_egreso, descripcion, tipo_gasto, archivo_evidencia)

    sql = """
    CALL AgregarEgreso(:tipoEgreso, :monto, :fechaEgreso, :descripcion, :tipoGasto, :archivoEvidencia);
    """
    try:
        with db.engine.connect() as con:
            con.execute(text(sql), {
                'tipoEgreso': tipo_egreso,
                'monto': monto,
                'fechaEgreso': fecha_egreso,
                'descripcion': descripcion,
                'tipoGasto': tipo_gasto,
                'archivoEvidencia': archivo_evidencia
            })
    except Exception as e:
        raise