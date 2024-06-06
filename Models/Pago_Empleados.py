from Utils.db import db

class PagoEmpleado(db.Model):
    __tablename__ = 'PagoEmpleado'
    PagoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    EgresoID = db.Column(db.Integer, db.ForeignKey('Egresos.EgresoID'), nullable=False)
    EmpleadoID = db.Column(db.Integer, db.ForeignKey('Empleados.EmpleadoID'), nullable=False)
    NombreEmpleado = db.Column(db.String(100), nullable=False)
    CargoEmpleado = db.Column(db.String(100), nullable=False)
    MontoPago = db.Column(db.Numeric(10, 2), nullable=False)
    FechaPago = db.Column(db.Date, nullable=False)
    Detalle = db.Column(db.String(200), nullable=True)

    def __init__(self, EgresoID, EmpleadoID, NombreEmpleado, CargoEmpleado, MontoPago, FechaPago, Detalle=None):
        self.EgresoID = EgresoID
        self.EmpleadoID = EmpleadoID
        self.NombreEmpleado = NombreEmpleado
        self.CargoEmpleado = CargoEmpleado
        self.MontoPago = MontoPago
        self.FechaPago = FechaPago
        self.Detalle = Detalle

    def serialize(self):
        return {
            'PagoID': self.PagoID,
            'EgresoID': self.EgresoID,
            'EmpleadoID': self.EmpleadoID,
            'NombreEmpleado': self.NombreEmpleado,
            'CargoEmpleado': self.CargoEmpleado,
            'MontoPago': float(self.MontoPago),  # Convert Decimal to float for serialization
            'FechaPago': self.FechaPago.isoformat(),  # Convert Date to String for serialization
            'Detalle': self.Detalle
        }