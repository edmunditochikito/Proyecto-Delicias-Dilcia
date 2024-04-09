from Utils.db import db

class clientes(db.Model):
    __tablename__='Clientes'
    Cedula = db.Column(db.String(20), primary_key=True)
    Nombre = db.Column(db.String(100))
    Direccion = db.Column(db.String(200))
    Telefono = db.Column(db.String(15))
    
    def __init__(self,Cedula,Nombre,Direccion,Telefono):
        self.Cedula=Cedula
        self.Nombre= Nombre
        self.Direccion = Direccion
        self.Telefono = Telefono
        
