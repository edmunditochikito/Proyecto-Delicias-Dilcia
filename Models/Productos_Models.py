from Utils.db import db

class productosInventario(db.Model):
    __tablename__ = 'ProductosInventario'
    ProductoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(200), nullable=False)
    UnidadDeMedida = db.Column(db.String(50), nullable=False)
    PrecioUnitario = db.Column(db.Numeric(10, 2), nullable=False)
    Cantidad = db.Column(db.Numeric(10, 2), nullable=False)
    Categoria = db.Column(db.Enum('Lacteos', 'Carnes', 'Pollo', 'Verduras', 'Insumos Basicos', 'Todos'), nullable=False, default='Insumos Basicos')  # Añadimos el campo Categoria

    def __init__(self, Nombre, UnidadDeMedida, PrecioUnitario, Cantidad, Categoria='Insumos Basicos'):
        self.Nombre = Nombre
        self.UnidadDeMedida = UnidadDeMedida
        self.PrecioUnitario = PrecioUnitario
        self.Cantidad = Cantidad
        self.Categoria = Categoria

    def serialize(self):
        return {
            'ProductoID': self.ProductoID,
            'Nombre': self.Nombre,
            'UnidadDeMedida': self.UnidadDeMedida,
            'PrecioUnitario': str(self.PrecioUnitario),  # Convertimos Decimal a String para la serialización
            'Cantidad': str(self.Cantidad),  # Convertimos Decimal a String para la serialización
            'Categoria': self.Categoria
        }