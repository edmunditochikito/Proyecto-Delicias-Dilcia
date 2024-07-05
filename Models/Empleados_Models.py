from Utils.db import db

class empleados(db.Model):
    __tablename__ = 'Empleados'
    EmpleadoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Cargo = db.Column(db.String(100), nullable=False)
    FechaContratacion = db.Column(db.Date, nullable=False)
    FechaSalida = db.Column(db.Date, nullable=True, default=None)  # Permite valores NULL por defecto
    Telefono = db.Column(db.String(15), nullable=True)  # Añadimos el campo Telefono

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
            'FechaContratacion': self.FechaContratacion.isoformat() if self.FechaContratacion else None,
            'FechaSalida': self.FechaSalida.isoformat() if self.FechaSalida else None,
            'Telefono': self.Telefono
        }
