from flask import Blueprint,render_template,request,redirect,url_for,jsonify
from Models.Clientes_Models import clientes
from Utils.db import db

Clientes=Blueprint('Clientes',__name__)

@Clientes.route('/InicioCliente', methods = ['GET'])
def InicioCliente():
    
    Clientes = clientes.query.all()
    return render_template('Clientes/Inicio.html',Clientes=Clientes)


@Clientes.route('/AgregarCliente', methods = ['GET'])
def AgregarClienteGet():
    return render_template('Clientes/Agregar.html')


@Clientes.route('/AgregarCliente', methods = ['POST'])
def AgregarClientePost():
    Nombre= request.form['nombre']
    Direccion=request.form['direccion']
    Telefono=request.form['telefono']
    Cedula=request.form['cedula']
    
    new_cliente=clientes(Cedula,Nombre,Direccion,Telefono)
    db.session.add(new_cliente)
    db.session.commit()
    return redirect('/AgregarCliente')
   
@Clientes.route('/EliminarCliente/<Cedula>')
def EliminarCliente(Cedula):
    Cliente=clientes.query.get(Cedula)
    db.session.delete(Cliente)
    db.session.commit()
    return redirect("/InicioCliente")
    

@Clientes.route('/ActualizarCliente',methods=['POST'])
def ActualizarCliente():
    Cedula=request.form.get('cedula')
    
    Cliente=clientes.query.get(Cedula)
    Cliente.Nombre=request.form.get('nombre')
    Cliente.Telefono=request.form.get('telefono')
    Cliente.Direccion=request.form.get('direccion')
    db.session.commit()
    
    return redirect("/InicioCliente")


@Clientes.route('/ObtenerCliente/<Cedula>', methods=['POST'])
def ObtenerCliente(Cedula):
    Cliente=clientes.query.get(Cedula)   
    return jsonify(Cliente.serialize())

