from Utils.db import db

class productosCompra(db.Model):
    __tablename__ = 'ProductosCompra'
    ProductoCompraID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CompraID = db.Column(db.Integer, db.ForeignKey('ComprasProveedor.CompraID'))
    ProductoID = db.Column(db.Integer, db.ForeignKey('ProductosInventario.ProductoID'))
    Cantidad = db.Column(db.Integer, nullable=False)
    PrecioUnitario = db.Column(db.Numeric(10, 2), nullable=False)
    NombreProducto = db.Column(db.String(200), nullable=True)
    NombreProveedor = db.Column(db.String(100), nullable=True)

    def __init__(self, CompraID, ProductoID, Cantidad, PrecioUnitario, NombreProducto, NombreProveedor):
        self.CompraID = CompraID
        self.ProductoID = ProductoID
        self.Cantidad = Cantidad
        self.PrecioUnitario = PrecioUnitario
        self.NombreProducto = NombreProducto
        self.NombreProveedor = NombreProveedor

    def serialize(self):
        return {
            'ProductoCompraID': self.ProductoCompraID,
            'CompraID': self.CompraID,
            'ProductoID': self.ProductoID,
            'Cantidad': self.Cantidad,
            'PrecioUnitario': str(self.PrecioUnitario),  # Convert Decimal to String for serialization
            'NombreProducto': self.NombreProducto,
            'NombreProveedor': self.NombreProveedor
        }