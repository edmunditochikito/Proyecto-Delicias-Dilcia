from flask import Blueprint,render_template,request,redirect,jsonify
from Models.Platillos_Models import platillos 
from Utils.db import db
Platillos=Blueprint('Platillos',__name__)

@Platillos.route('/InicioPlatillo', methods = ['GET'])
def InicioPlatillo():
    return render_template('Platillos/Inicio.html')

@Platillos.route('/dtDishes', methods = ['GET'])
def datatable():
    Platillos=platillos.query.all()
    Platillos_Array=[]
    for Platillo in Platillos:
        Platillos_dict={
            'platilloID': Platillo.PlatilloID,
            'nombre': Platillo.Nombre,
            'precio': str(Platillo.Precio),
            'descripcion':Platillo.Descripcion,
            'estado':Platillo.EstadoPlatillo
        }
        Platillos_Array.append(Platillos_dict)
    return jsonify({'data':Platillos_Array})    



@Platillos.route('/AgregarPlatillo', methods = ['GET'])
def AgregarPlatilloGet():
    return render_template('Platillos/Agregar.html')

@Platillos.route('/AgregarPlatillo', methods = ['POST'])
def AgregarPlatilloPost():
    Nombre = request.form['nombre']
    Precio = request.form['precio']
    Descripcion = request.form['descripcion']
    estado="No Disponible"
    
    New_Platillo = platillos(Nombre,Precio,Descripcion,estado)
    db.session.add(New_Platillo)
    db.session.commit()
    return redirect('/AgregarPlatillo')

@Platillos.route('/ActualizarPlatillo/<id>',methods=['POST'])
def ActualizarPlatillos(id):
    
    Nombre = request.form['nombre']
    Precio = request.form['precio']
    Descripcion = request.form['descripcion']
    Estado = request.form['estado']
    
    Platillo = platillos.query.get(id)
    BFPlatillo = Platillo.Nombre
    
    Platillo.Nombre = Nombre
    Platillo.Precio = Precio
    Platillo.Descripcion = Descripcion
    Platillo.EstadoPlatillo = Estado
    db.session.commit()
    
    return jsonify({"message": "Platillo actualizado correctamente.", "status": "success", "dish":BFPlatillo})
    
    
@Platillos.route('/EliminarPlatillo/<id>',methods=['POST'])
def EliminarPlatillo(id):
    Platillo=platillos.query.get(id)
    db.session.delete(Platillo)
    db.session.commit()
    return jsonify({"message": "Platillo eliminado correctamente.", "status": "success", "dish": Platillo.serialize()})


@Platillos.route('/ObtenerPlatillo/<id>', methods=['POST'])
def ObtenerPlatillo(id):
    Platillo=platillos.query.get(id)   
    return jsonify(Platillo.serialize())


@Platillos.route('/EstadoPlatillo/<id>', methods=['POST'])
def EstadoPlatillo(id):
    datos_formulario = request.json
    Platillo = platillos.query.get(id)
    estado = datos_formulario.get('estado')
    Platillo.EstadoPlatillo = estado
    db.session.commit()
    return jsonify({"message": "Estado actualizado correctamente.", "status": "success"})




