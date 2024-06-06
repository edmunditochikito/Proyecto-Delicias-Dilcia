from flask import Blueprint,render_template,request,redirect,jsonify
from Models.Salario_Empleados_Models import salarioEmpleados
from sqlalchemy import text
from Utils.db import db

SalarioEmpleados = Blueprint('SalarioEmpleados', __name__)

@SalarioEmpleados.route('/InicioSalario', methods=['GET'])
def InicioSalario():
    return render_template('Empleados/Salario.html')


@SalarioEmpleados.route('/dtSalary', methods = ['GET'])
def datatable():   
    Salarios = salarioEmpleados.query.all()
    salarios_array = []
    for salario in Salarios:
        salario_dict = {
            'SalarioID': salario.SalarioID,
            'EmpleadoID': salario.EmpleadoID,
            'Nombre': salario.Nombre,
            'Cargo': salario.Cargo,
            'Monto': salario.Monto,
        }
        salarios_array.append(salario_dict)
    return jsonify({ 'data': salarios_array })


@SalarioEmpleados.route('/PagarSalario', methods=['POST'])
def PagarSalario():
    datos_formulario = request.json
    empleado_id = datos_formulario.get('empleado_id')
    monto = datos_formulario.get('monto')
    detalle = datos_formulario.get('detalle')
    pagar_salarios(empleado_id, monto, detalle)
    return jsonify({'data': "Salario pagado correctamente."})
    



def pagar_salarios(empleado_id, monto, detalle):
    sql = """
    CALL pagarSalarios(:p_EmpleadoID, :p_Monto, :p_Detalle);
    """
    try:
        with db.engine.connect() as con:
            con.execute(text(sql), {
                'p_EmpleadoID': empleado_id,
                'p_Monto': monto,
                'p_Detalle': detalle
            })
    except Exception as e:
        raise 