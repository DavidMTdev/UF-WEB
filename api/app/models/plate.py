from ..config.database import db
from ..models import restaurant, orderContent, order


class Plate(db.Model):
    __tablename__ = 'plate'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)  # menu, boisson, dessert, plat
    content = db.Column(db.Text)
    picture = db.Column(db.String(255), default='default.png')
    unitPrice = db.Column(db.Float(), nullable=False)

    id_restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    # plate_order_content = db.relationship('Order', secondary='order_content', backref=db.backref('plate', lazy='dynamic'))

    def __init__(self, name, type, content, picture, unitPrice, id_restaurant):
        self.name = name
        self.type = type
        self.content = content
        self.picture = picture
        self.unitPrice = unitPrice
        self.id_restaurant = id_restaurant.id

    def __repr__(self):
        return '<Plate {}>'.format(self.id)
