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
            'PlatilloID': Platillo.PlatilloID,
            'Nombre': Platillo.Nombre,
            'Precio': str(Platillo.Precio),
            'descripcion':Platillo.Descripcion
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
    
    New_Platillo = platillos(Nombre,Precio,Descripcion)
    db.session.add(New_Platillo)
    db.session.commit()
    return redirect('/AgregarPlatillo')

@Platillos.route('/ActualizarPlatillo/<id>',methods=['POST'])
def ActualizarPlatillos(id):
    
    Nombre = request.form['nombre']
    Precio = request.form['precio']
    Descripcion = request.form['descripcion']
   
    
    Platillo = platillos.query.get(id)
    BFPlatillo = Platillo.Nombre
    
    Platillo.Nombre = Nombre
    Platillo.Precio = Precio
    Platillo.Descripcion = Descripcion
    print(Descripcion)
    db.session.commit()
    
    return jsonify({"message": "Platillo actualizado correctamente.", "status": "success", "dish":BFPlatillo})
    
    
@Platillos.route('/EliminarPlatillo/<id>',methods=['POST'])
def EliminarPlatillo(id):
    Platillo=platillos.query.get(id)
    db.session.delete(Platillo)
    db.session.commit()
    return jsonify({"message": "Platillo eliminado correctamente.", "status": "success", "dish": Platillo.serialize()})


@Platillos.route('/ObtenerPlatillo/<id>', methods=['POST'])
def ObtenerProveedor(id):
    Platillo=platillos.query.get(id)   
    return jsonify(Platillo.serialize())


