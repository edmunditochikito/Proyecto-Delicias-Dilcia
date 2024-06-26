from Utils.db import db

class deudasClientes(db.Model):
    __tablename__ = 'DeudasClientes'
    
    DeudaID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ClienteID = db.Column(db.String(20), db.ForeignKey('Clientes.Cedula'), nullable=False)
    Monto = db.Column(db.Numeric(10, 2), nullable=False)
    FechaVencimiento = db.Column(db.Date, nullable=False)
    EstadoPago = db.Column(db.String(50), nullable=False)
    PedidoID = db.Column(db.Integer, db.ForeignKey('PedidosClientes.PedidoID'), nullable=False)
    PedidoTotal = db.Column(db.Numeric(10, 2), nullable=False)
    ClienteNombre = db.Column(db.String(100), nullable=True)  # Esta columna fue añadida después

    def __init__(self, ClienteID, Monto, FechaVencimiento, EstadoPago, PedidoID, PedidoTotal, ClienteNombre):
        self.ClienteID = ClienteID
        self.Monto = Monto
        self.FechaVencimiento = FechaVencimiento
        self.EstadoPago = EstadoPago
        self.PedidoID = PedidoID
        self.PedidoTotal = PedidoTotal
        self.ClienteNombre = ClienteNombre

    def serialize(self):
        return {
            'DeudaID': self.DeudaID,
            'ClienteID': self.ClienteID,
            'Monto': self.Monto,
            'FechaVencimiento': self.FechaVencimiento,
            'EstadoPago': self.EstadoPago,
            'PedidoID': self.PedidoID,
            'PedidoTotal': self.PedidoTotal,
            'ClienteNombre': self.ClienteNombre
        }