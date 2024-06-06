from Utils.db import db

class salarioEmpleados(db.Model):
    __tablename__ = 'SalarioEmpleados'
    SalarioID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    EmpleadoID = db.Column(db.Integer, db.ForeignKey('Empleados.EmpleadoID'), nullable=False)
    Nombre = db.Column(db.String(100), nullable=False)
    Cargo = db.Column(db.String(100), nullable=False)
    Monto = db.Column(db.Numeric(10, 2), nullable=False)

    def __init__(self, EmpleadoID, Nombre, Cargo, Monto):
        self.EmpleadoID = EmpleadoID
        self.Nombre = Nombre
        self.Cargo = Cargo
        self.Monto = Monto

    def serialize(self):
        return {
            'SalarioID': self.SalarioID,
            'EmpleadoID': self.EmpleadoID,
            'Nombre': self.Nombre,
            'Cargo': self.Cargo,
            'Monto': float(self.Monto)  # Convert Decimal to float for serialization
        }