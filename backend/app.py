from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from datetime import datetime
from sqlalchemy.sql import func
from guid import *

#Init app
app=Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
conn="postgresql://{0}:{1}@{2}:{3}/{4}".format('postgres','postgres','localhost','5432','twojejedzenie3x')
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db=SQLAlchemy(app)
ma=Marshmallow(app)

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
    moderators = db.relationship('Restaurant', backref='user', lazy=True)

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

class OrderDish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    count = db.Column(db.Integer, nullable=False)
    #dish_id = db.Column(db.Boolean, nullable=False)
    meat_type = db.Column(db.String(30), nullable=True)
    #order_id = db.Column(db.Boolean, nullable=False)
    price = db.Column(db.Float, nullable=False)
    sauce = db.Column(db.String(30), nullable=True)

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','active','address','authorize_date','birth_date','date_created','date_of_last_login',
        'email','end_authorize_date','name','password','phone','role','surname')

class RestaurantSchema(ma.Schema):
    class Meta:
        fields = ('id','address','delivery_cost','description','discounts','dishes','is_delivery',
        'kitchen_type','logo','min_order_cost','min_order_cost_free_delivery','name','phone','waiting_time_for_delivery')

class DishSchema(ma.Schema):
    class Meta:
        fields = ('id','description','dish_subtype','dish_type','meat_types','name','order_dishes',
        'pizza_diameter','price','restaurant_id','sauces')

class OrderSchema(ma.Schema):
    class Meta:
        fields = ('id','delivery_address','delivery_cost','dishes','dishes_cost','is_completed',
        'order_date','payment_form','total_cost','user_id')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)

dish_schema = DishSchema()
dishes_schema = DishSchema(many=True)

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

@app.route('/user', methods=['POST'])
def add_user():
    active = request.json['active']
    address = request.json['address']
    authorize_date = request.json['authorize_date']
    birth_date = request.json['birth_date']
    date_created = datetime.now()
    date_of_last_login = None
    email = request.json['email']
    end_authorize_date = request.json['end_authorize_date']
    name = request.json['name']
    password = 'xxx'
    phone = request.json['phone']
    role = request.json['role']
    surname = request.json['surname']

    new_user = User(active,address,authorize_date,birth_date,date_created,date_of_last_login,email,
    end_authorize_date,name,password,phone,role,surname)

    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)

@app.route('/all_users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)

@app.route('/user/<id>', methods=['PUT'])
def update_user(id):

    user = User.query.get(id)

    active = request.json['active']
    address = request.json['address']
    authorize_date = request.json['authorize_date']
    birth_date = request.json['birth_date']
    email = request.json['email']
    end_authorize_date = request.json['end_authorize_date']
    name = request.json['name']
    phone = request.json['phone']
    role = request.json['role']
    surname = request.json['surname']

    user.active = active
    user.address = address
    user.authorize_date = authorize_date
    user.birth_date = birth_date
    user.date_created = user.date_created
    user.date_of_last_login = user.date_of_last_login
    user.email = email
    user.end_authorize_date = user.end_authorize_date
    user.name = name
    user.password = user.password
    user.phone = phone
    user.role = role
    user.surname = surname

    db.session.commit()

    return user_schema.jsonify(user)

@app.route('/user/<id>', methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify("User " + id + " was succesfully deleted!")

if __name__ == '__main__':
    app.run(debug=True)




