from Utils.db import db

class proveedores(db.Model):
    __tablename__ = 'Proveedores'
    ProveedorID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(100))
    Direccion = db.Column(db.String(200))
    Telefono = db.Column(db.String(15))
    
    def __init__(self, Nombre, Direccion, Telefono):
        self.Nombre = Nombre
        self.Direccion = Direccion
        self.Telefono = Telefono
        
    def serialize(self):
        return {
            'ProveedorID': self.ProveedorID,
            'Nombre': self.Nombre,
            'Direccion': self.Direccion,
            'Telefono': self.Telefono
        }