from Utils.db import db
class PedidosClientes(db.Model):
    __tablename__ = 'PedidosClientes'

    PedidoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ClienteID = db.Column(db.String(20), db.ForeignKey('Clientes.Cedula'))
    FechaPedido = db.Column(db.Date)
    Total = db.Column(db.Numeric(10, 2))
    PlatilloID = db.Column(db.Integer, db.ForeignKey('Platillo.PlatilloID'))
    Cantidad = db.Column(db.Integer)
    EstadoPago = db.Column(db.String(20))

    # Definir las relaciones con las tablas relacionadas
    cliente = db.relationship('clientes', backref=db.backref('pedidos'))
    platillo = db.relationship('platillos', backref=db.backref('pedidos'))

    def __init__(self, ClienteID, FechaPedido, Total, PlatilloID, Cantidad, EstadoPago):
        self.ClienteID = ClienteID
        self.FechaPedido = FechaPedido
        self.Total = Total
        self.PlatilloID = PlatilloID
        self.Cantidad = Cantidad
        self.EstadoPago = EstadoPago

    def serialize(self):
        return {
            'PedidoID': self.PedidoID,
            'ClienteID': self.ClienteID,
            'FechaPedido': self.FechaPedido,
            'Total': float(self.Total),
            'PlatilloID': self.PlatilloID,
            'Cantidad': self.Cantidad,
            'EstadoPago': self.EstadoPago
        }