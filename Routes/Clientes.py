from flask import Blueprint,render_template,request,redirect,jsonify,flash
from Models.Clientes_Models import clientes
from Utils.db import db
import re


Clientes=Blueprint('Clientes',__name__)

@Clientes.route('/InicioCliente', methods = ['GET'])
def InicioCliente():

    return render_template('Clientes/Inicio.html')

@Clientes.route('/dtCustomer', methods = ['GET'])
def datatable():   
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


@Clientes.route('/AgregarCliente', methods = ['GET'])
def AgregarClienteGet():
    return render_template('Clientes/Agregar.html')


@Clientes.route('/AgregarCliente', methods = ['POST'])
def AgregarClientePost():
    try:
        datos_formulario = request.json
        
        Nombre = datos_formulario.get('nombre')
        Direccion = datos_formulario.get('direccion')
        Telefono = datos_formulario.get('telefono')
        Cedula = datos_formulario.get('cedula')
        print(Nombre)
        print(Direccion)
        print(Telefono)
        print(Cedula)
        
        lista_clientes = clientes.query.all()
        
        for cliente in lista_clientes:
            if cliente.Cedula == Cedula:
                return jsonify({'data':"Error: La cédula ya existe"})
        
        new_cliente = clientes(Cedula, Nombre, Direccion, Telefono)
        db.session.add(new_cliente)
        db.session.commit()

        return jsonify({'data':"Cliente agregado correctamente."})
    except KeyError as e:
        flash(f"Error: {e}. Campo faltante en el formulario.", "error")
        return redirect('/AgregarCliente')
   
   
   
@Clientes.route('/EliminarCliente/<Cedula>', methods=['POST'])
def EliminarCliente(Cedula):
    Cliente = clientes.query.get(Cedula)
    if not Cliente:
        flash("Error: El cliente no existe.", "error")
        return redirect('/InicioCliente')
    
    db.session.delete(Cliente)
    db.session.commit()
    return jsonify({"message": "Cliente eliminado correctamente.", "status": "success", "customer": Cliente.serialize()})
    

@Clientes.route('/ActualizarCliente/<Cedula>', methods=['POST'])
def ActualizarCliente(Cedula):
    try:
        
        Nombre = request.form['nombre']
        Direccion = request.form['direccion']
        Telefono = request.form['telefono']

        if  not Nombre or not Direccion or not Telefono:
            flash("Error: Uno o más campos están vacíos.", "error")
            return redirect('/InicioCliente')
        
        Cliente = clientes.query.get(Cedula)
        
        if not Cliente:
            flash("Error: El cliente no existe.", "error")
            return redirect('/InicioCliente')
        
        
        BFCustomer=Cliente.Nombre
        Cliente.Nombre = Nombre
        Cliente.Telefono = Telefono
        Cliente.Direccion = Direccion
        db.session.commit()
        
       
        return jsonify({"message": "Cliente actualizado correctamente.", "status": "success", "customer":BFCustomer})
        
    
    except KeyError as e:
        flash(f"Error: {e}. Campo faltante en el formulario.", "error")
        return redirect('/InicioCliente')
    except Exception as e:
        flash(f"Error al actualizar el cliente: {str(e)}", "error")
        return redirect('/InicioCliente')


@Clientes.route('/ObtenerCliente/<Cedula>', methods=['POST'])
def ObtenerCliente(Cedula):
    Cliente=clientes.query.get(Cedula)   
    return jsonify(Cliente.serialize())

