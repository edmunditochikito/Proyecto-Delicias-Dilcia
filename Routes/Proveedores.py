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
            'direccion':Proveedor.Direccion,
            'categoria':Proveedor.Categoria
        }
        Proveedores_Array.append(Proveedores_dict)
    return jsonify({'data':Proveedores_Array})    


@Proveedores.route('/AgregarProveedor', methods = ['GET'])
def AgregarProveedoroGet():
    return render_template('Proveedores/Agregar.html')

@Proveedores.route('/AgregarProveedor', methods = ['Post'])
def AgregarProveedoroPost():
    datos_formulario = request.json   
    Nombre = datos_formulario.get('nombre')
    Direccion = datos_formulario.get('direccion')
    Telefono = datos_formulario.get('telefono')
    Categoria = datos_formulario.get('categoria')
      
    new_provider = proveedores(Nombre, Direccion, Telefono, Categoria)
    db.session.add(new_provider)
    db.session.commit()
    
    return jsonify({'data':"Proveedor agregado correctamente."})


@Proveedores.route('/ActualizarProveedor/<id>',methods=['POST'])
def ActualizarProveedor(id):
    
    Nombre = request.form['nombre']
    Direccion = request.form['direccion']
    Telefono = request.form['telefono']
    Categoria = request.form['Categoria']
    
    
    Proveedor=proveedores.query.get(id)
    BFProveedor=Proveedor.Nombre
    Proveedor.Nombre=Nombre
    Proveedor.Direccion=Direccion
    Proveedor.Telefono=Telefono
    Proveedor.Categoria=Categoria
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