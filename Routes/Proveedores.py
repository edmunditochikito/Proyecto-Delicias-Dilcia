from flask import Blueprint,render_template,jsonify,request,flash,redirect
from Utils.db import db
from Models.Proveedores_Models import proveedores


Proveedores=Blueprint('Proveedores',__name__)

@Proveedores.route('/InicioProveedor', methods = ['GET'])
def InicioProveedor():
    return render_template('Proveedores/Inicio.html')

@Proveedores.route('/dtProvider', methods = ['GET'])
def datatable():
    Proveedores=proveedores.query.all()
    Proveedores_Array=[]
    for Proveedor in Proveedores:
        Proveedores_dict={
            'nombre':Proveedor.Nombre,
            'id':Proveedor.ProveedorID,
            'telefono':Proveedor.Telefono,
            'direccion':Proveedor.Direccion
        }
        Proveedores_Array.append(Proveedores_dict)
    return jsonify({'data':Proveedores_Array})    


@Proveedores.route('/AgregarProveedor', methods = ['GET'])
def AgregarProveedoroGet():
    return render_template('Proveedores/Agregar.html')

@Proveedores.route('/AgregarProveedor', methods = ['Post'])
def AgregarProveedoroPost():
    Nombre = request.form['nombre']
    Direccion = request.form['direccion']
    Telefono = request.form['telefono']
    
    new_provider = proveedores(Nombre, Direccion, Telefono)
    db.session.add(new_provider)
    db.session.commit()
    return redirect('/AgregarProveedor')


@Proveedores.route('/ActualizarProveedor/<id>',methods=['POST'])
def ActualizarProveedor(id):
    
    Nombre = request.form['nombre']
    Direccion = request.form['direccion']
    Telefono = request.form['telefono']
    
    
    Proveedor=proveedores.query.get(id)
    BFProveedor=Proveedor.Nombre
    Proveedor.Nombre=Nombre
    Proveedor.Direccion=Direccion
    Proveedor.Telefono=Telefono
    db.session.commit()
    
    return jsonify({"message": "Proveedor actualizado correctamente.", "status": "success", "provider":BFProveedor})
    
@Proveedores.route('/EliminarProveedor/<id>',methods=['POST'])
def EliminarProveedor(id):
    Proveedor=proveedores.query.get(id)
    db.session.delete(Proveedor)
    db.session.commit()
    return jsonify({"message": "Proveedor eliminado correctamente.", "status": "success", "provider": Proveedor.serialize()})

@Proveedores.route('/ObtenerProveedor/<id>', methods=['POST'])
def ObtenerProveedor(id):
    Proveedor=proveedores.query.get(id)   
    return jsonify(Proveedor.serialize())