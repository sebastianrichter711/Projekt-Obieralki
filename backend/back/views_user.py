from flask import Flask,request,Blueprint,jsonify
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import user_schema, users_schema
from flask_jwt_extended import get_jwt, jwt_required
import json
from fastapi import APIRouter, Body
from .openapi_schemas import UserRequest

views_user = Blueprint('views_user', __name__)
users_router=APIRouter()

@views_user.route('', methods=['GET'])
@users_router.get("/api/users")
def get_users():
    all_users = User.query.all()
    if len(all_users) == 0:
        return jsonify("Users not found!"), 404
    result = users_schema.dump(all_users)
    return jsonify(result)

@views_user.route('/<uuid:user_id>', methods=['GET'])
@users_router.get("/api/users/{user_id}")
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify("User not found!"), 404
    return user_schema.jsonify(user)

@views_user.route('/<uuid:user_id>', methods=['PUT'])
@users_router.put("/api/users/{user_id}")
def update_user(user_id, userRequest: UserRequest=Body()):

    active = True
    address = request.json['address']
    authorize_date = request.json['authorize_date']
    birth_date = request.json['birth_date']
    email = request.json['email']
    end_authorize_date = request.json['end_authorize_date']
    name = request.json['name']
    phone = request.json['phone']
    role = request.json['role']
    surname = request.json['surname']
    orders = request.json['orders']
    restaurants = request.json['restaurants']

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
        user.orders = user.orders
        user.restaurants=user.restaurants

        db.session.commit()

        return user_schema.jsonify(user)
    except Exception as e:
        print(e)
        return jsonify("Failure in modifying an user"), 422

@views_user.route('/<uuid:id>', methods=["DELETE"])
@users_router.delete("/api/users/{id}")
def delete_user(id):
    try:
        user = User.query.get(id)
        if user is None:
            return jsonify("User not found"), 404
        db.session.delete(user)
        db.session.commit()
        print("Usunięto usera")
        return jsonify("User " + str(id) + " was succesfully deleted!")
    except:
        return jsonify("Faliure in deleting an user"), 500
    