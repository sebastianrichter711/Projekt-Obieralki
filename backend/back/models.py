from . import db
from sqlalchemy.sql import func
from .guid import *
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    active = db.Column(db.Boolean, nullable=False)
    address = db.Column(db.String(200), nullable=True)
    authorize_date = db.Column(db.DateTime(timezone=True), nullable=True)
    birth_date = db.Column(db.Date, nullable=True)
    date_created = db.Column(db.DateTime(timezone=True),server_default=func.now(),nullable=False)
    date_of_last_login = db.Column(db.DateTime(timezone=True),nullable=True)
    email=db.Column(db.String(200), unique=True, nullable=False)
    end_authorize_date = db.Column(db.DateTime(timezone=True), nullable=True)
    name = db.Column(db.String(30), nullable=True)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(14), nullable=True)
    role = db.Column(db.Enum('admin', 'moderator', 'user', name='user_role'), index=True, nullable=False)
    surname = db.Column(db.String(30), nullable=True)
    orders = db.relationship('Order', backref='user', lazy=True, cascade="all,delete")
    restaurants = db.relationship('Restaurant', backref='user', lazy=True)
    pass_reset_token = db.Column(db.String(400), nullable=True)

    def __init__(self, active,date_created,email,role,password, authorize_date, end_authorize_date):
        self.active = active
        self.date_created = date_created
        self.email = email
        self.password = password
        self.role=role
        self.authorize_date = authorize_date
        self.end_authorize_date = end_authorize_date

    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

class TokenBlocklist(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

order_dishes = db.Table('order_dishes',
    db.Column('order_id', GUID(), db.ForeignKey('order.id'), primary_key=True, default=lambda: str(uuid.uuid4())),
    db.Column('dish_id', GUID(), db.ForeignKey('dish.id'), primary_key=True, default=lambda: str(uuid.uuid4())),
    db.Column('count', db.Integer, nullable=False),
    db.Column('price', db.Float, nullable=False)
)

class Order(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    delivery_address = db.Column(db.String(200), nullable=True)
    delivery_cost = db.Column(db.Float, nullable=True)
    order_dishes = db.relationship('Dish', secondary=order_dishes, lazy='subquery', backref=db.backref('orders', lazy=True))
    dishes_cost = db.Column(db.Float, nullable=True)
    is_completed = db.Column(db.Boolean, nullable=False)
    order_date = db.Column(db.DateTime(timezone=True),nullable=True)
    payment_form = db.Column(db.Enum('card', 'blik', 'voucher', name='payment_form'), index=True,nullable=True)
    total_cost = db.Column(db.Float, nullable=True)
    user_id = db.Column(GUID(), db.ForeignKey('user.id'), nullable=False)
    restaurant_id = db.Column(GUID(), db.ForeignKey('restaurant.id'), nullable=False)

    def __init__(self,is_completed,user_id,restaurant_id):
        self.is_completed = is_completed
        self.user_id = user_id
        self.restaurant_id = restaurant_id

class Dish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    description = db.Column(db.String(200), nullable=True)
    dish_subtype = db.Column(db.String(30), nullable=True)
    dish_type = db.Column(db.Enum('starter', 'soup', 'main_course','dessert','pizza','kebab','additives','drinks', name='dish_type'), index=True)
    meat_types = db.Column(db.PickleType, nullable=True)
    name = db.Column(db.String(300), nullable=False)
    pizza_diameter = db.Column(db.Float, nullable=True)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(GUID(), db.ForeignKey('restaurant.id'), nullable=False)
    sauces = db.Column(db.PickleType, nullable=True)

    def __init__(self, description,dish_subtype,dish_type,meat_types,name,pizza_diameter,price,restaurant_id,sauces):
        self.description = description
        self.dish_subtype = dish_subtype
        self.dish_type = dish_type
        self.meat_types = meat_types
        self.name = name
        self.pizza_diameter = pizza_diameter
        self.price = price
        self.restaurant_id = restaurant_id
        self.sauces = sauces

class Restaurant(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    address = db.Column(db.String(200), nullable=False)
    delivery_cost = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=True)
    discounts = db.Column(db.PickleType, nullable=True)
    dishes = db.relationship('Dish', backref='restaurant', cascade="all,delete", lazy=True)
    is_delivery = db.Column(db.Boolean, nullable=False)
    kitchen_type = db.Column(db.String(20), nullable=False)
    logo = db.Column(db.String(300), nullable=True)
    min_order_cost = db.Column(db.Float, nullable=False)
    min_order_cost_free_delivery = db.Column(db.Float, nullable=True)
    name = db.Column(db.String(30), nullable=False)
    phone = db.Column(db.String(14), nullable=False)
    waiting_time_for_delivery = db.Column(db.String(15), nullable=False)
    moderator_id = db.Column(GUID(), db.ForeignKey('user.id'), nullable=True)
    orders = db.relationship('Order', backref='restaurant', lazy=True)

    def __init__(self, address,delivery_cost,description,discounts,dishes,is_delivery,kitchen_type,logo,min_order_cost,
    min_order_cost_free_delivery,name,phone,waiting_time_for_delivery,moderator_id,orders):
        self.address = address
        self.delivery_cost = delivery_cost
        self.description = description
        self.discounts = discounts
        self.dishes = dishes
        self.is_delivery = is_delivery
        self.kitchen_type = kitchen_type
        self.logo = logo
        self.min_order_cost = min_order_cost
        self.min_order_cost_free_delivery = min_order_cost_free_delivery
        self.name = name
        self.phone = phone
        self.waiting_time_for_delivery = waiting_time_for_delivery
        self.moderator_id = moderator_id
        self.orders = orders