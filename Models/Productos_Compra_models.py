from Utils.db import db

class productosCompra(db.Model):
    __tablename__ = 'ProductosCompra'
    ProductoCompraID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CompraID = db.Column(db.Integer, db.ForeignKey('ComprasProveedor.CompraID'), nullable=False)
    ProductoID = db.Column(db.Integer, db.ForeignKey('ProductosInventario.ProductoID'), nullable=False)
    Cantidad = db.Column(db.Integer, nullable=False)
    PrecioUnitario = db.Column(db.Numeric(10, 2), nullable=False)
    
    def __init__(self, CompraID, ProductoID, Cantidad, PrecioUnitario):
        self.CompraID = CompraID
        self.ProductoID = ProductoID
        self.Cantidad = Cantidad
        self.PrecioUnitario = PrecioUnitario
        
    def serialize(self):
        return {
            'ProductoCompraID': self.ProductoCompraID,
            'CompraID': self.CompraID,
            'ProductoID': self.ProductoID,
            'Cantidad': self.Cantidad,
            'PrecioUnitario': str(self.PrecioUnitario)
        }