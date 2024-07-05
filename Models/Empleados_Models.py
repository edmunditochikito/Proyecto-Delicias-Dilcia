from Utils.db import db

class empleados(db.Model):
    __tablename__ = 'Empleados'
    EmpleadoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Cargo = db.Column(db.String(100), nullable=False)
    FechaContratacion = db.Column(db.Date, nullable=False)
    FechaSalida = db.Column(db.Date, nullable=True)
    Telefono = db.Column(db.String(15), nullable=True)

    def __init__(self, Nombre, Cargo, FechaContratacion, FechaSalida=None, Telefono=None):
        self.Nombre = Nombre
        self.Cargo = Cargo
        self.FechaContratacion = FechaContratacion
        self.FechaSalida = FechaSalida
        self.Telefono = Telefono

    def serialize(self):
        return {
            'EmpleadoID': self.EmpleadoID,
            'Nombre': self.Nombre,
            'Cargo': self.Cargo,
            'FechaContratacion': self.FechaContratacion.isoformat(),  # Convert Date to String for serialization
            'FechaSalida': self.FechaSalida.isoformat() if self.FechaSalida else None, # Convert Date to String for serialization
            'Telefono': self.Telefono if self.Telefono else 'N/A'
        }