from flask import Blueprint, render_template, request, jsonify
from sqlalchemy import text
from Utils.db import db
from Models.Empleados_Models import empleados

Empleados = Blueprint('Empleados', __name__)

@Empleados.route('/InicioEmpleados', methods=['GET'])
def InicioEmpleados():
    return render_template('Empleados/Inicio.html')

@Empleados.route('/dtWorker', methods = ['GET'])
def datatable():   
    Empleados = empleados.query.all()
    empleados_array = []
    for empleado in Empleados:
        empleado_dict = {
            'EmpleadoID': empleado.EmpleadoID,
            'Nombre': empleado.Nombre,
            'Cargo': empleado.Cargo,
            'FechaContratacion': empleado.FechaContratacion,
            'Telefono': empleado.Telefono
        }
        empleados_array.append(empleado_dict)
    return jsonify({ 'data': empleados_array })



@Empleados.route('/AgregarEmpleado', methods=['GET'])
def AgregarEmpleadoGET():
    return render_template('Empleados/Agregar.html')

@Empleados.route('/AgregarEmpleado', methods=['POST'])
def AgregarEmpleadoPOST():
    try:
        
        datos_formulario = request.json
        Telefono = datos_formulario.get('telefono')
        Nombre = datos_formulario.get('nombre')
        Cargo = datos_formulario.get('cargo')
        Fecha = datos_formulario.get('fecha')
        
        new_empleado = empleados(Nombre, Cargo, Fecha,Telefono)
        db.session.add(new_empleado)
        db.session.commit()

        return jsonify({'data': "Empleado agregado correctamente."})
    except KeyError as e:
        return jsonify({'data': f"Error: {e}. Campo faltante en el formulario."})
    

@Empleados.route('/EliminarEmpleado/<id>', methods=['POST'])
def EliminarEmpleado(id):     
        Empleado = empleados.query.get(id)
        db.session.delete(Empleado)
        db.session.commit()
        return jsonify({"message": "Cliente eliminado correctamente.", "status": "success", "worker": Empleado.serialize()})
    
    
@Empleados.route('/ActualizarEmpleado/<id>', methods=['POST'])
def ActualizarEmpleado(id):
       datos_formulario = request.json

       Nombre = datos_formulario.get('Nombre')
       Cargo = datos_formulario.get('Cargo')
       Fecha = datos_formulario.get('FechaContratacion')
       Telefono = datos_formulario.get('Telefono')
       Empleado = empleados.query.get(id)
        
       BFWorker=Empleado.Nombre
        
       Empleado.Nombre = Nombre
       Empleado.Cargo = Cargo
       Empleado.FechaContratacion = Fecha
       Empleado.Telefono = Telefono
       db.session.commit()
        
       return jsonify({"message": "Empleado actualizado correctamente.", "status": "success", "worker":BFWorker})
        
    
    
@Empleados.route('/AsignarSalario', methods=['POST'])
def AsignarSalario():
    datos_formulario = request.json
    id = datos_formulario.get('EmpleadoID')
    monto = datos_formulario.get('Monto')
    asignar_salario(id, monto)
    return jsonify({'data': 'Salario asignado correctamente.'})



@Empleados.route('/ObtenerEmpleado/<id>', methods=['POST'])
def ObtenerEmpleado(id):
    Empleado=empleados.query.get(id)   
    return jsonify(Empleado.serialize())


def asignar_salario(cedula, monto):
    sql = """
    CALL AsignarSalario(:p_EmpleadoID, :p_Monto);
    """
    try:
        with db.engine.connect() as con:
            con.execute(text(sql), {
                'p_EmpleadoID': cedula,
                'p_Monto': monto
            })
       
    except Exception as e:
    
        raise
