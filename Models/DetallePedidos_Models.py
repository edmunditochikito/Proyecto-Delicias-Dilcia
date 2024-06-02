from Utils.db import db
from datetime import date

class detallePedidoCliente(db.Model):
    __tablename__ = 'DetallePedidoCliente'
    DetallePedidoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    PedidoID = db.Column(db.Integer, db.ForeignKey('PedidosClientes.PedidoID'), nullable=False)
    ClienteID = db.Column(db.String(20), db.ForeignKey('Clientes.Cedula'), nullable=False)
    ClienteNombre = db.Column(db.String(100), nullable=False)
    PlatilloID = db.Column(db.Integer, db.ForeignKey('Platillo.PlatilloID'), nullable=False)
    PlatilloNombre = db.Column(db.String(200), nullable=False)
    PrecioUnitario = db.Column(db.Numeric(10, 2), nullable=False)
    Cantidad = db.Column(db.Integer, nullable=False)
    PrecioTotal = db.Column(db.Numeric(10, 2), nullable=False)
    EstadoPago = db.Column(db.String(20), nullable=False)
    Fecha = db.Column(db.Date, nullable=False, default=date.today)
    

    # Relationships
    pedido = db.relationship('PedidosClientes', backref=db.backref('detalle_pedido_cliente', lazy=True))
    cliente = db.relationship('clientes', backref=db.backref('detalle_pedido_cliente', lazy=True))
    platillo = db.relationship('platillos', backref=db.backref('detalle_pedido_cliente', lazy=True))

    def __init__(self, PedidoID, ClienteID, ClienteNombre, PlatilloID, PlatilloNombre, PrecioUnitario, Cantidad, PrecioTotal, EstadoPago, Fecha=None):
        self.PedidoID = PedidoID
        self.ClienteID = ClienteID
        self.ClienteNombre = ClienteNombre
        self.PlatilloID = PlatilloID
        self.PlatilloNombre = PlatilloNombre
        self.PrecioUnitario = PrecioUnitario
        self.Cantidad = Cantidad
        self.PrecioTotal = PrecioTotal
        self.EstadoPago = EstadoPago
        self.Fecha = Fecha if Fecha else date.today()

    def serialize(self):
        return {
            'DetallePedidoID': self.DetallePedidoID,
            'PedidoID': self.PedidoID,
            'ClienteID': self.ClienteID,
            'ClienteNombre': self.ClienteNombre,
            'PlatilloID': self.PlatilloID,
            'PlatilloNombre': self.PlatilloNombre,
            'PrecioUnitario': str(self.PrecioUnitario),
            'Cantidad': self.Cantidad,
            'PrecioTotal': str(self.PrecioTotal),
            'EstadoPago': self.EstadoPago,
            'Fecha': self.Fecha.isoformat()
        }
        