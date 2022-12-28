from flask import Flask,request,Blueprint,jsonify
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import user_schema, users_schema

views_user = Blueprint('views_user', __name__)

@views_user.route('/user', methods=['POST'])
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

@views_user.route('/all_users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

@views_user.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)

@views_user.route('/user/<id>', methods=['PUT'])
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

@views_user.route('/user/<id>', methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify("User " + id + " was succesfully deleted!")