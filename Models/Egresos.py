from Utils.db import db

class egresos(db.Model):
    __tablename__ = 'Egresos'
    EgresoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TipoEgreso = db.Column(db.String(100), nullable=False)
    Monto = db.Column(db.Numeric(10, 2), nullable=False)
    FechaEgreso = db.Column(db.Date, nullable=False)
    Descripcion = db.Column(db.String(200), nullable=True)
    SalarioID = db.Column(db.Integer, db.ForeignKey('Salarios.SalarioID'), nullable=True)
    ProveedorID = db.Column(db.Integer, db.ForeignKey('Proveedores.ProveedorID'), nullable=True)
    TipoGasto = db.Column(db.Enum('Compra', 'Pago de Salario', 'Servicio Basico'), nullable=False)
    ArchivoEvidencia = db.Column(db.LargeBinary, nullable=True)

    def __init__(self, TipoEgreso, Monto, FechaEgreso, Descripcion=None, SalarioID=None, ProveedorID=None, TipoGasto='Compra', ArchivoEvidencia=None):
        self.TipoEgreso = TipoEgreso
        self.Monto = Monto
        self.FechaEgreso = FechaEgreso
        self.Descripcion = Descripcion
        self.SalarioID = SalarioID
        self.ProveedorID = ProveedorID
        self.TipoGasto = TipoGasto
        self.ArchivoEvidencia = ArchivoEvidencia

    def serialize(self):
        return {
            'EgresoID': self.EgresoID,
            'TipoEgreso': self.TipoEgreso,
            'Monto': str(self.Monto),  # Convertimos Decimal a String para la serialización
            'FechaEgreso': self.FechaEgreso.isoformat() if self.FechaEgreso else None,
            'Descripcion': self.Descripcion,
            'SalarioID': self.SalarioID,
            'ProveedorID': self.ProveedorID,
            'TipoGasto': self.TipoGasto,
            'ArchivoEvidencia': self.ArchivoEvidencia.decode('utf-8') if self.ArchivoEvidencia else None  # Convertir BLOB a cadena en base64 para la serialización
        }