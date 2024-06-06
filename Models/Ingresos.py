from Utils.db import db

class ingresos(db.Model):
    __tablename__ = 'Ingresos'
    IngresoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ClienteID = db.Column(db.String(20), db.ForeignKey('Clientes.Cedula'), nullable=False)
    PedidoID = db.Column(db.Integer, db.ForeignKey('PedidosClientes.PedidoID'), nullable=False)
    Monto = db.Column(db.Numeric(10, 2), nullable=False)
    FechaIngreso = db.Column(db.Date, nullable=False)
    Descripcion = db.Column(db.String(200), nullable=True)
    TipoIngreso = db.Column(db.String(50), nullable=False)

    def __init__(self, ClienteID, PedidoID, Monto, FechaIngreso, TipoIngreso, Descripcion=None):
        self.ClienteID = ClienteID
        self.PedidoID = PedidoID
        self.Monto = Monto
        self.FechaIngreso = FechaIngreso
        self.Descripcion = Descripcion
        self.TipoIngreso = TipoIngreso

    def serialize(self):
        return {
            'IngresoID': self.IngresoID,
            'ClienteID': self.ClienteID,
            'PedidoID': self.PedidoID,
            'Monto': float(self.Monto),  # Convert Decimal to float for serialization
            'FechaIngreso': self.FechaIngreso.isoformat(),  # Convert Date to String for serialization
            'Descripcion': self.Descripcion,
            'TipoIngreso': self.TipoIngreso
        }
