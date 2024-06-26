from Models.Deuda_Cliente_Models import deudasClientes
from Models.Deuda_Cliente_Pagada_Models import deudaClientePagada 
from flask import request, jsonify, Blueprint,json,render_template
from sqlalchemy import text
from Utils.db import db


Deudas = Blueprint('Deudas',__name__)

@Deudas.route('/InicioDeudas', methods=['GET'])
def InicioDeudas():
    return render_template('Deudas/Inicio.html')    


@Deudas.route('/dtDebt', methods = ['GET'])
def datatable():   
    Deudas = deudasClientes.query.all()
    deudas_array = []
    for deuda in Deudas:
        deuda_dict = {
            'DeudaID': deuda.DeudaID,
            'ClienteID': deuda.ClienteID,
            'Monto': deuda.Monto,
            'FechaVencimiento': deuda.FechaVencimiento,
            'EstadoPago': deuda.EstadoPago,
            'PedidoID': deuda.PedidoID,
            'PedidoTotal': deuda.PedidoTotal,
            'ClienteNombre': deuda.ClienteNombre,
        }
        deudas_array.append(deuda_dict)
    return jsonify({ 'data': deudas_array })


@Deudas.route('/PagarDeuda', methods = ['POST'])
def PagarDeuda():
    try:
        Form_data = request.json
        Cedula = Form_data['ClienteID']
        print(Cedula)
        print(Form_data)
        pagardeuda(Cedula)
        return jsonify({'message':'Deuda Pagada'})
    except Exception as e:
        return jsonify({'message':"Error al pagar la deuda"})


def pagardeuda(cliente_id):
    sql = """
    CALL pagardeuda(:cliente_id);
    """
    try:
        with db.engine.connect() as con:
            con.execute(text(sql),{
                'cliente_id': cliente_id
                })
    except Exception as e:
        raise














@Deudas.route('/GetDebt/<id>', methods = ['POST'])
def GetDebt(id):  
    Deuda = deudasClientes.query.get(id)
    return jsonify(Deuda.serialize())