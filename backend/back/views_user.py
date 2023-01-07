from flask import Flask,request,Blueprint,jsonify
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import user_schema, users_schema
from flask_jwt_extended import get_jwt, jwt_required

views_user = Blueprint('views_user', __name__)

# @views_user.route('/user', methods=['POST'])
# def add_user():
#     active = request.json['active']
#     address = request.json['address']
#     authorize_date = request.json['authorize_date']
#     birth_date = request.json['birth_date']
#     date_created = datetime.now()
#     date_of_last_login = None
#     email = request.json['email']
#     end_authorize_date = request.json['end_authorize_date']
#     name = request.json['name']
#     password = 'xxx'
#     phone = request.json['phone']
#     role = request.json['role']
#     surname = request.json['surname']

#     new_user = User(active,address,authorize_date,birth_date,date_created,date_of_last_login,email,
#     end_authorize_date,name,password,phone,role,surname)

#     db.session.add(new_user)
#     db.session.commit()

#     return user_schema.jsonify(new_user)

@views_user.route('', methods=['GET'])
@jwt_required()
def get_users():
    all_users = User.query.all()
    if len(all_users) == 0:
        return jsonify("Users not found!"), 404
    result = users_schema.dump(all_users)
    return jsonify(result)

@views_user.route('/<uuid:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify("User not found!"), 404
    return user_schema.jsonify(user)

@views_user.route('/<uuid:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):

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

    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify("User not found"), 404

        user.active = active
        user.address = address
        user.authorize_date = authorize_date
        user.birth_date = birth_date
        user.date_created = user.date_created
        user.date_of_last_login = user.date_of_last_login
        user.email = email
        user.end_authorize_date = end_authorize_date
        user.name = name
        user.password = user.password
        user.phone = phone
        user.role = role
        user.surname = surname

        db.session.commit()

        return user_schema.jsonify(user)
    except:
        return jsonify("Failure in modifying an user"), 422

@views_user.route('/<uuid:user_id>', methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify("User not found"), 404
        db.session.delete(user)
        db.session.commit()
        return jsonify("User " + str(user_id) + " was succesfully deleted!")
    except:
        return jsonify("Faliure in deleting an user"), 500
    