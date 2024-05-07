from Utils.db import db

class platillos(db.Model):
    __tablename__ = 'Platillo'
    PlatilloID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(200))
    Precio = db.Column(db.Numeric(10, 2))
    Descripcion = db.Column(db.String(200))
    
    def __init__(self, Nombre, Precio, Descripcion):
        self.Nombre = Nombre
        self.Precio = Precio
        self.Descripcion = Descripcion
        
    def serialize(self):
        return {
            'PlatilloID': self.PlatilloID,
            'Nombre': self.Nombre,
            'Precio': str(self.Precio), 
            'Descripcion': self.Descripcion
        }