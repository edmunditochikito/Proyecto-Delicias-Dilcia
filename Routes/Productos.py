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
    try:
        Datos_formulario = request.json
        print(Datos_formulario) 

        NombreDelProducto = Datos_formulario.get('nombre')
        Cantidad = Datos_formulario.get('cantidad')
        PrecioUnitario = Datos_formulario.get('precio')
        UnidadDeMedida = Datos_formulario.get('unidad_de_medida')
        productos_Lista = productosInventario.query.all()
        for producto in productos_Lista:
            if producto.Nombre == NombreDelProducto:
                print(producto.Nombre)
                print(NombreDelProducto)
                return jsonify({"data": "Error: El producto ya existe.",})

        new_Prodcut=productosInventario(NombreDelProducto,UnidadDeMedida,PrecioUnitario,Cantidad)
        db.session.add(new_Prodcut)
        db.session.commit()

        return jsonify({
            "data":"Producto agregado correctamente",
        })
    except KeyError as e:
        return jsonify({"data":f"Error: {e}. Campo faltante en el formulario."})

@Productos.route('/ActualizarProductos/<id>',methods=['POST'])
def ActualizarProductos(id):
    try:
    
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
    except KeyError as e:
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