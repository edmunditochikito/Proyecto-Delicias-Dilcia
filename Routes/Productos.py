from flask import Blueprint,render_template,request,redirect,jsonify,flash
from Models.Productos_Models import productosInventario
from Utils.db import db

Productos=Blueprint('Productos',__name__)

@Productos.route('/InicioProducto', methods = ['GET'])
def InicioProducto():
    return render_template('Productos/Inicio.html')

@Productos.route('/dtProduct', methods=['GET'])
def datatable():   
    productos = productosInventario.query.all()
    productos_array = []
    for producto in productos:
        producto_dict = {
            'id': producto.ProductoID,
            'nombre': producto.Nombre,
            'unidadDeMedida': producto.UnidadDeMedida,
            'precio': str(producto.PrecioUnitario),  # Convertir a cadena si es necesario
            'cantidad': str(producto.Cantidad),      # Convertir a cadena si es necesario
        }
        productos_array.append(producto_dict)
    return jsonify({'data': productos_array})

@Productos.route('/AgregarProducto', methods = ['GET'])
def AgregarProductoGet():
    return render_template('Productos/Agregar.html')


@Productos.route('/AgregarProducto', methods = ['POST'])
def AgregarProductoPost():
    
    NombreDelProducto = request.form['nombre']
    Cantidad = request.form['cantidad']
    PrecioUnitario = request.form['precio']
    UnidadDeMedida = request.form['unidadDeMedida']
    
    new_Prodcut=productosInventario(NombreDelProducto,UnidadDeMedida,PrecioUnitario,Cantidad)
    db.session.add(new_Prodcut)
    db.session.commit()
    
    return render_template('Productos/Agregar.html')

@Productos.route('/ActualizarProductos/<id>',methods=['POST'])
def ActualizarProductos(id):
    
    ProductoID = request.form['id']
    Nombre = request.form['nombre']
    UnidadDeMedida = request.form['unidad_de_medida']
    PrecioUnitario = request.form['precio']
    Cantidad = request.form['cantidad']
    
    Producto = productosInventario.query.get(id)
    BFPlroducto = Producto.Nombre
    
    Producto.Nombre = Nombre
    Producto.Cantidad = Cantidad
    Producto.PrecioUnitario = PrecioUnitario
    Producto.UnidadDeMedida = UnidadDeMedida
    Producto.ProductoID = ProductoID
  
    db.session.commit()
    
    return jsonify({"message": "Producto actualizado correctamente.", "status": "success", "product":BFPlroducto})


@Productos.route('/EliminarProducto/<id>', methods=['POST'])
def EliminarProducto(id):
    Producto = productosInventario.query.get(id)
    if not Producto:
        flash("Error: El cliente no existe.", "error")
        return redirect('/InicioProducto')
    
    db.session.delete(Producto)
    db.session.commit()
    return jsonify({"message": "Producto eliminado correctamente.", "status": "success", "Product": Producto.serialize()})


@Productos.route('/ObtenerProducto/<id>', methods=['POST'])
def ObtenerProducto(id):
    Producto=productosInventario.query.get(id)   
    return jsonify(Producto.serialize())