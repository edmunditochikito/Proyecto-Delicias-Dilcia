from Utils.db import db

class productosInventario(db.Model):
    __tablename__ = 'ProductosInventario'
    ProductoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(200))
    UnidadDeMedida = db.Column(db.String(50))
    PrecioUnitario = db.Column(db.DECIMAL(10, 2))
    Cantidad = db.Column(db.DECIMAL(10, 2))
    
    def __init__(self, Nombre, UnidadDeMedida, PrecioUnitario, Cantidad):
        self.Nombre = Nombre
        self.UnidadDeMedida = UnidadDeMedida
        self.PrecioUnitario = PrecioUnitario
        self.Cantidad = Cantidad
        
    def serialize(self):
        return {
            'ProductoID': self.ProductoID,
            'Nombre': self.Nombre,
            'UnidadDeMedida': self.UnidadDeMedida,
            'PrecioUnitario': str(self.PrecioUnitario),
            'Cantidad': str(self.Cantidad)
        }