from flask import Blueprint,render_template

Platillos=Blueprint('Platillos',__name__)

@Platillos.route('/InicioPlatillo', methods = ['GET'])
def InicioPlatillo():
    return render_template('Platillos/Inicio.html')


@Platillos.route('/AgregarPlatillo', methods = ['GET'])
def AgregarPlatilloGet():
    return render_template('Platillos/Agregar.html')