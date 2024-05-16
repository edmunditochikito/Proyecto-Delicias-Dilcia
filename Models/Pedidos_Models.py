from Utils.db import db

class PedidosClientes(db.Model):
    __tablename__ = 'PedidosClientes'
    
    PedidoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ClienteID = db.Column(db.String(20), db.ForeignKey('Clientes.Cedula'), nullable=False)
    ClienteNombre = db.Column(db.String(100), nullable=False)
    FechaPedido = db.Column(db.Date, nullable=False)
    Total = db.Column(db.Numeric(10, 2), nullable=False)
    PlatilloID = db.Column(db.Integer, db.ForeignKey('Platillo.PlatilloID'), nullable=False)
    Cantidad = db.Column(db.Integer, nullable=False)
    EstadoPago = db.Column(db.String(20), nullable=False)
    
    def __init__(self, ClienteID, ClienteNombre, FechaPedido, Total, PlatilloID, Cantidad, EstadoPago):
        self.ClienteID = ClienteID
        self.ClienteNombre = ClienteNombre
        self.FechaPedido = FechaPedido
        self.Total = Total
        self.PlatilloID = PlatilloID
        self.Cantidad = Cantidad
        self.EstadoPago = EstadoPago

    def serialize(self):
        return {
            'PedidoID': self.PedidoID,
            'ClienteID': self.ClienteID,
            'ClienteNombre': self.ClienteNombre,
            'FechaPedido': self.FechaPedido.isoformat(),
            'Total': str(self.Total),
            'PlatilloID': self.PlatilloID,
            'Cantidad': self.Cantidad,
            'EstadoPago': self.EstadoPago
        }