from . import db
from sqlalchemy.sql import func
from .guid import *

class User(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    active = db.Column(db.Boolean, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    authorize_date = db.Column(db.DateTime(timezone=True), nullable=True)
    birth_date = db.Column(db.DateTime(timezone=True), nullable=False)
    date_created = db.Column(db.DateTime(timezone=True),server_default=func.now())
    date_of_last_login = db.Column(db.DateTime(timezone=True),server_default=func.now())
    email=db.Column(db.String(200), unique=True, nullable=False)
    end_authorize_date = db.Column(db.DateTime(timezone=True), nullable=True)
    name = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(14), nullable=False)
    role = db.Column(db.Enum('admin', 'moderator', 'user', name='user_role'), index=True)
    surname = db.Column(db.String(30), nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)
    restaurants = db.relationship('Restaurant', backref='user', lazy=True)

    def __init__(self, active,address,authorize_date,birth_date,date_created,date_of_last_login,
    email, end_authorize_date, name,password,phone,role,surname):
        self.active = active
        self.address = address
        self.authorize_date = authorize_date
        self.birth_date = birth_date
        self.date_created = date_created
        self.date_of_last_login = date_of_last_login
        self.email = email
        self.end_authorize_date = end_authorize_date
        self.name = name
        self.password = password
        self.phone = phone
        self.role = role
        self.surname = surname

    def __repr__(self):
        return f'<Student {self.firstname}>'

class Order(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    delivery_address = db.Column(db.String(200), nullable=False)
    delivery_cost = db.Column(db.Float, nullable=False)
    #dishes = db.Column(db.Boolean, nullable=False)
    dishes_cost = db.Column(db.Float, nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False)
    order_date = db.Column(db.DateTime(timezone=True),server_default=func.now())
    payment_form = db.Column(db.Enum('card', 'blik', 'voucher', name='payment_form'), index=True)
    total_cost = db.Column(db.Float, nullable=False)
    user_id = db.Column(GUID(), db.ForeignKey('user.id'), nullable=False)

    def __init__(self,delivery,delivery_cost,dishes_cost,is_completed,order_date,payment_form,total_cost,user_id):
        self.delivery = delivery
        self.delivery_cost = delivery_cost
        self.dishes_cost = dishes_cost
        self.is_completed = is_completed
        self.order_date = order_date
        self.payment_form = payment_form
        self.total_cost = total_cost
        self.user_id = user_id

class Dish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    description = db.Column(db.String(200), nullable=True)
    dish_subtype = db.Column(db.String(30), nullable=True)
    dish_type = db.Column(db.Enum('starter', 'soup', 'main_course','dessert','pizza','kebab','additives','drinks', name='dish_type'), index=True)
    meat_types = db.Column(db.PickleType, nullable=True)
    name = db.Column(db.String(300), nullable=False)
    #order_dishes = db.Column(db.Boolean, nullable=False)
    pizza_diameter = db.Column(db.Float, nullable=True)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(GUID(), db.ForeignKey('restaurant.id'), nullable=True)
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
    dishes = db.relationship('Dish', backref='restaurant', lazy=True)
    is_delivery = db.Column(db.Boolean, nullable=False)
    kitchen_type = db.Column(db.String(20), nullable=False)
    logo = db.Column(db.String(300), nullable=True)
    min_order_cost = db.Column(db.Float, nullable=False)
    min_order_cost_free_delivery = db.Column(db.Float, nullable=True)
    name = db.Column(db.String(30), nullable=False)
    phone = db.Column(db.String(14), nullable=False)
    waiting_time_for_delivery = db.Column(db.String(15), nullable=False)
    moderator_id = db.Column(GUID(), db.ForeignKey('user.id'), nullable=True)

    def __init__(self, address,delivery_cost,description,discounts,dishes,is_delivery,kitchen_type,logo,min_order_cost,
    min_order_cost_free_delivery,name,phone,waiting_time_for_delivery,moderator_id):
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

class OrderDish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    count = db.Column(db.Integer, nullable=False)
    #dish_id = db.Column(db.Boolean, nullable=False)
    meat_type = db.Column(db.String(30), nullable=True)
    #order_id = db.Column(db.Boolean, nullable=False)
    price = db.Column(db.Float, nullable=False)
    sauce = db.Column(db.String(30), nullable=True)

    def __init__(self,count,meat_type,price,sauce):
        self.count = count
        self.meat_type = meat_type
        self.price = price
        self.sauce = sauce