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
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)

class Dish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)

class Restaurant(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)

class OrderDish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    active = db.Column(db.Boolean, nullable=False)

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




