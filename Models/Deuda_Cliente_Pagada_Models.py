from Utils.db import db

class deudaClientePagada(db.Model):
    __tablename__ = 'DeudaClientePagada'
    
    DeudaClientePagadaID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    DeudaID = db.Column(db.Integer, db.ForeignKey('DeudasClientes.DeudaID'), nullable=False)
    MontoPagado = db.Column(db.Numeric(10, 2), nullable=False)
    FechaPago = db.Column(db.Date, nullable=False)
    IngresoID = db.Column(db.Integer, db.ForeignKey('Ingresos.IngresoID'), nullable=False)
    ClienteNombre = db.Column(db.String(100), nullable=False)

    def __init__(self, DeudaID, MontoPagado, FechaPago, IngresoID, ClienteNombre):
        self.DeudaID = DeudaID
        self.MontoPagado = MontoPagado
        self.FechaPago = FechaPago
        self.IngresoID = IngresoID
        self.ClienteNombre = ClienteNombre

    def serialize(self):
        return {
            'DeudaClientePagadaID': self.DeudaClientePagadaID,
            'DeudaID': self.DeudaID,
            'MontoPagado': self.MontoPagado,
            'FechaPago': self.FechaPago,
            'IngresoID': self.IngresoID,
            'ClienteNombre': self.ClienteNombre
        }