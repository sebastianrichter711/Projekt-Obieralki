from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import dish_schema, dishes_schema
from flask_jwt_extended import get_jwt, jwt_required
from fastapi import APIRouter, Body
from .openapi_schemas import DishRequest

views_dish = Blueprint('views_dish', __name__)
dishes_router = APIRouter()

@views_dish.route('', methods=['POST'])
@dishes_router.post("/api/dishes")
def add_dish(dishRequest: DishRequest=Body()):
    
    try:

        description = request.json['description']
        dish_subtype = request.json['dish_subtype']
        dish_type = request.json['dish_type']
        meat_types = request.json['meat_types']
        name = request.json['name']
        pizza_diameter = request.json['pizza_diameter']
        price = request.json['price']
        restaurant_id = request.json['restaurant_id']
        sauces = request.json['sauces']

        if pizza_diameter is "":
            pizza_diameter = None
        
        new_dish = Dish(description,dish_subtype,dish_type,meat_types,name,pizza_diameter,price,restaurant_id,sauces)

        db.session.add(new_dish)
        db.session.commit()

        return dish_schema.jsonify(new_dish), 201
    except Exception as e:
        print(e)
        return jsonify("Creating a dish is not successful!"), 422

@views_dish.route('/', methods=['GET'])
@dishes_router.get("/api/dishes")
def get_dishes():
    all_dishes = Dish.query.all()
    if len(all_dishes) == 0:
        return jsonify("Not found dishes"), 404
    result = dishes_schema.dump(all_dishes)
    return jsonify(result)

@views_dish.route('/<uuid:dish_id>', methods=['GET'])
@dishes_router.get("/api/dishes/{dish_id}")
def get_dish(dish_id):
    dish = Dish.query.get(dish_id)
    if dish is None:
        return jsonify("Dish " + (dish_id) + " not found"), 404
    return dish_schema.jsonify(dish)

@views_dish.route('/restaurants/<uuid:restaurant_id>', methods=['GET'])
@dishes_router.get("/api/dishes/restaurants/{restaurant_id}")
def get_all_dishes_from_restaurant(restaurant_id):
    all_dishes = Dish.query.filter(Dish.restaurant_id==restaurant_id)
    if all_dishes.count() == 0:
        return jsonify("Not found dishes from a restaurant " + str(restaurant_id)), 404
    result = dishes_schema.dump(all_dishes)
    return jsonify(result)

@views_dish.route('/<uuid:dish_id>', methods=['PUT'])
@dishes_router.put("/api/dishes/{dish_id}")
def update_dish(dish_id, dishRequest: DishRequest=Body()):

    description = request.json['description']
    dish_subtype = request.json['dish_subtype']
    dish_type = request.json['dish_type']
    meat_types = request.json['meat_types']
    name = request.json['name']
    pizza_diameter = request.json['pizza_diameter']
    price = request.json['price']
    restaurant_id = request.json['restaurant_id']
    sauces = request.json['sauces']

    try:

        dish = Dish.query.get(dish_id)
        if dish is None:
            return jsonify("Dish " + str(dish_id) + "not_found"), 404

        print(dish_type)
        dish.description = description
        dish.dish_subtype = dish_subtype
        dish.dish_type = dish_type
        dish.meat_types = dish.meat_types
        dish.name = name
        dish.pizza_diameter = pizza_diameter
        dish.price = price
        dish.restaurant_id = restaurant_id
        dish.sauces = dish.sauces
    
        db.session.commit()

        return dish_schema.jsonify(dish)

    except Exception as e:
        print(e)
        return jsonify("Updating a dish wasn't ended successfully!"), 422

@views_dish.route('/<uuid:dish_id>', methods=["DELETE"])
@dishes_router.delete("/api/dishes/{dish_id}")
def delete_dish(dish_id):
    try:
        dish = Dish.query.get(dish_id)
        if dish is None:
            return jsonify("Dish " + str(dish_id) + "not_found"), 404
        db.session.delete(dish)
        db.session.commit()
        return jsonify("Dish " + str(dish_id) + " was succesfully deleted!")
    except:
        return jsonify("Deleting a dish wasn't ended successfully!"), 500
