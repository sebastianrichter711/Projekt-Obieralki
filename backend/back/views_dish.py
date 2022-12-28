from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import dish_schema, dishes_schema


views_dish = Blueprint('views_dish', __name__)

@views_dish.route('/dish', methods=['POST'])
def add_dish():
    description = request.json['description']
    dish_subtype = request.json['dish_subtype']
    dish_type = request.json['dish_type']
    meat_types = request.json['meat_types']
    name = request.json['name']
    pizza_diameter = request.json['pizza_diameter']
    price = request.json['price']
    restaurant_id = request.json['restaurant_id']
    sauces = request.json['sauces']

    new_dish = Dish(description,dish_subtype,dish_type,meat_types,name,pizza_diameter,price,restaurant_id,sauces)

    db.session.add(new_dish)
    db.session.commit()

    return dish_schema.jsonify(new_dish)

@views_dish.route('/all_dishes', methods=['GET'])
def get_dishes():
    all_dishes = Dish.query.all()
    result = dishes_schema.dump(all_dishes)
    return jsonify(result)

@views_dish.route('/dish/<id>', methods=['GET'])
def get_dish(id):
    dish = Dish.query.get(id)
    return dish_schema.jsonify(dish)

@views_dish.route('/all_dishes_from_restaurant/<id>', methods=['GET'])
def get_all_dishes_from_restaurant(id):
    all_dishes = Dish.query.filter(Dish.restaurant_id==id)
    result = dishes_schema.dump(all_dishes)
    return jsonify(result)

@views_dish.route('/all_dishes_from_restaurant_by_name/<id>', methods=['GET'])
def get_all_dishes_from_restaurant_by_name(id):
    dish_name=request.json['name']
    name_to_request =  '%' + dish_name + '%'
    all_dishes = Dish.query.filter(Dish.restaurant_id==id, Dish.name.like(name_to_request))
    result = dishes_schema.dump(all_dishes)
    return jsonify(result)

@views_dish.route('/dish/<id>', methods=['PUT'])
def update_dish(id):

    dish = Dish.query.get(id)

    description = request.json['description']
    dish_subtype = request.json['dish_subtype']
    dish_type = request.json['dish_type']
    meat_types = request.json['meat_types']
    name = request.json['name']
    pizza_diameter = request.json['pizza_diameter']
    price = request.json['price']
    restaurant_id = request.json['restaurant_id']
    sauces = request.json['sauces']

    dish.description = description
    dish.dish_subtype = dish_subtype
    dish.dish_type = dish_type
    dish.meat_types = meat_types
    dish.name = name
    dish.pizza_diameter = pizza_diameter
    dish.price = price
    dish.restaurant_id = restaurant_id
    dish.sauces = sauces
    
    db.session.commit()

    return dish_schema.jsonify(dish)

@views_dish.route('/dish/<id>', methods=["DELETE"])
def delete_dish(id):
    dish = Dish.query.get(id)
    db.session.delete(dish)
    db.session.commit()
    return jsonify("Dish " + id + " was succesfully deleted!")