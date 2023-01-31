from flask import Flask,request,Blueprint,jsonify
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import user_schema, users_schema
from flask_jwt_extended import get_jwt, jwt_required
import json
from fastapi import APIRouter, Body, Path
from .openapi_schemas import UserRequest

views_user = Blueprint('views_user', __name__)
users_router=APIRouter()

@views_user.route('', methods=['GET'])
@users_router.get("/api/users",tags=["Users"], description="Get all users", 
responses={200: {"description": "Returns all users"}, 404: {"description": "Not found users"}, 
401: {"description": "Unauthorized user tried to get all users"}, 500: {"description":"Internal server error"}})
def get_users():
    all_users = User.query.all()
    if len(all_users) == 0:
        return jsonify("Users not found!"), 404
    result = users_schema.dump(all_users)
    return jsonify(result)

@views_user.route('/<uuid:user_id>', methods=['GET'])
@users_router.get("/api/users/{user_id}",tags=["Users"], description="Get user by its ID", 
responses={200: {"description": "Returns got user data"}, 404: {"description": "Not found user"},
401: {"description": "Unauthorized user tried to get data of user by its ID"}, 500: {"description":"Internal server error"}})
def get_user(user_id = Path(description="An ID of user")):
    user = User.query.get(user_id)
    if user is None:
        return jsonify("User not found!"), 404
    return user_schema.jsonify(user)

@views_user.route('/<uuid:user_id>', methods=['PUT'])
@users_router.put("/api/users/{user_id}",tags=["Users"], description="Update of user data", 
responses={200: {"description": "User was updated"}, 400: {"description": "Error validation in given data"}, 
401: {"description": "Unauthorized user tried to modify an user"}, 404: {"description": "Not found user"}, 500: {"description":"Internal server error"}})
def update_user(user_id = Path(description="An ID of user"), userRequest: UserRequest=Body(description="An user request data")):

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
        return jsonify("Failure in modifying an user"), 500

@views_user.route('/<uuid:id>', methods=["DELETE"])
@users_router.delete("/api/users/{id}",tags=["Users"], description="Delete an user", 
responses={200: {"description": "User was deleted"}, 404: {"description": "Not found user"},
401: {"description": "Unauthorized user tried to delete an user"}, 500: {"description":"Internal server error"}})
def delete_user(id = Path(description="An ID of user")):
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
    