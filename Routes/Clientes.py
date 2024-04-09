from flask import Blueprint,render_template,request,redirect
from Models.Clientes_Models import clientes
from Utils.db import db

Clientes=Blueprint('Clientes',__name__)

@Clientes.route('/InicioCliente', methods = ['GET'])
def InicioCliente():
    
    Lista_Clientes = clientes.query.all()
    return render_template('Clientes/Inicio.html',Lista_Clientes=Lista_Clientes)


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
    print(new_cliente)
    return redirect('/AgregarCliente')
   
@Clientes.route('/EliminarCliente/<Cedula>')
def EliminarCliente(Cedula):
    Cliente=clientes.query.get(Cedula)
    db.session.delete(Cliente)
    db.session.commit()
    return redirect("/InicioCliente")
    