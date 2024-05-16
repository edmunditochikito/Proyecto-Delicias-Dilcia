from Utils.db import db

class platillos(db.Model):
    __tablename__ = 'Platillo'
    PlatilloID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nombre = db.Column(db.String(200), nullable=False)
    Precio = db.Column(db.Numeric(10, 2), nullable=False)
    Descripcion = db.Column(db.String(200), nullable=True)
    EstadoPlatillo = db.Column(db.String(20), nullable=False)

    def __init__(self, Nombre, Precio, Descripcion, EstadoPlatillo):
        self.Nombre = Nombre
        self.Precio = Precio
        self.Descripcion = Descripcion
        self.EstadoPlatillo = EstadoPlatillo

    def serialize(self):
        return {
            'PlatilloID': self.PlatilloID,
            'Nombre': self.Nombre,
            'Precio': str(self.Precio),  # Convertimos Decimal a String para la serialización
            'Descripcion': self.Descripcion,
            'EstadoPlatillo': self.EstadoPlatillo
        }