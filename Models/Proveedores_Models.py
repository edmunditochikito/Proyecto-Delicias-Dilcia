from Utils.db import db

class proveedores(db.Model):
    __tablename__ = 'Proveedores'
    ProveedorID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Direccion = db.Column(db.String(200), nullable=False)
    Telefono = db.Column(db.String(15), nullable=False)
    Categoria = db.Column(db.Enum('Lacteos', 'Carnes', 'Pollo', 'Verduras', 'Insumos Basicos', 'Todos'), nullable=False, default='Insumos Basicos')  # Añadimos el campo Categoria

    def __init__(self, Nombre, Direccion, Telefono, Categoria='Insumos Basicos'):
        self.Nombre = Nombre
        self.Direccion = Direccion
        self.Telefono = Telefono
        self.Categoria = Categoria

    def serialize(self):
        return {
            'ProveedorID': self.ProveedorID,
            'Nombre': self.Nombre,
            'Direccion': self.Direccion,
            'Telefono': self.Telefono,
            'Categoria': self.Categoria
        }