from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import restaurant_schema, restaurants_schema


views_restaurant = Blueprint('views_restaurant', __name__)

@views_restaurant.route('/restaurant', methods=['POST'])
def add_restaurant():
    address = request.json['address']
    delivery_cost = request.json['delivery_cost']
    description = request.json['description']
    discounts = request.json['discounts']
    dishes = request.json['dishes']
    is_delivery = request.json['is_delivery']
    kitchen_type = request.json['kitchen_type']
    logo = request.json['logo']
    min_order_cost = request.json['min_order_cost']
    min_order_cost_free_delivery = request.json['min_order_cost_free_delivery']
    name = request.json['name']
    phone = request.json['phone']
    waiting_time_for_delivery = request.json['waiting_time_for_delivery']
    moderator_id = request.json['moderator_id']

    new_restaurant = Restaurant(address,delivery_cost,description,discounts,dishes,is_delivery,kitchen_type,logo,min_order_cost,
    min_order_cost_free_delivery,name,phone,waiting_time_for_delivery,moderator_id)

    db.session.add(new_restaurant)
    db.session.commit()

    return restaurant_schema.jsonify(new_restaurant)

@views_restaurant.route('/all_restaurants', methods=['GET'])
def get_restaurants():
    all_restaurants = Restaurant.query.all()
    result = restaurants_schema.dump(all_restaurants)
    return jsonify(result)

@views_restaurant.route('/all_restaurants_by_name_or_location', methods=['GET'])
def get_all_restaurants_by_name_or_location():
    location = request.json['location']
    location_to_request = '%' + location + '%'
    results = []
    all_restaurants_by_name = Restaurant.query.filter(Restaurant.name.like(location_to_request))
    if all_restaurants_by_name != None:
        if len(results) == 0:
            for rest in all_restaurants_by_name:
                results.append(rest)
        else:
            for result in results:
                for rest in all_restaurants_by_name:
                    if result.id is not rest.id:
                        results.append(rest)
    all_restaurants_by_address = Restaurant.query.filter(Restaurant.address.like(location_to_request))
    if all_restaurants_by_address != None:
        if len(results) == 0:
            for rest in all_restaurants_by_address:
                results.append(rest)
        else:
            for result in results:
                for rest in all_restaurants_by_address:
                    if result.id is not rest.id:
                        results.append(rest)

    result_of_search = restaurants_schema.dump(results)
    return jsonify(result_of_search)

@views_restaurant.route('/restaurant/<id>', methods=['GET'])
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    return restaurant_schema.jsonify(restaurant)

@views_restaurant.route('/restaurant/<id>', methods=['PUT'])
def update_restaurant(id):

    restaurant = Restaurant.query.get(id)

    address = request.json['address']
    delivery_cost = request.json['delivery_cost']
    description = request.json['description']
    discounts = request.json['discounts']
    dishes = request.json['dishes']
    is_delivery = request.json['is_delivery']
    kitchen_type = request.json['kitchen_type']
    logo = request.json['logo']
    min_order_cost = request.json['min_order_cost']
    min_order_cost_free_delivery = request.json['min_order_cost_free_delivery']
    name = request.json['name']
    phone = request.json['phone']
    waiting_time_for_delivery = request.json['waiting_time_for_delivery']
    moderator_id = request.json['moderator_id']

    restaurant.address = address
    restaurant.delivery_cost = delivery_cost
    restaurant.description = description
    restaurant.discounts = discounts
    restaurant.dishes = dishes
    restaurant.is_delivery = is_delivery
    restaurant.kitchen_type = kitchen_type
    restaurant.logo = logo
    restaurant.min_order_cost = min_order_cost
    restaurant.min_order_cost_free_delivery = min_order_cost_free_delivery
    restaurant.name = name
    restaurant.phone = phone
    restaurant.waiting_time_for_delivery = waiting_time_for_delivery
    restaurant.moderator_id = moderator_id

    db.session.commit()

    return restaurant_schema.jsonify(restaurant)

@views_restaurant.route('/restaurant/<id>', methods=["DELETE"])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    db.session.delete(restaurant)
    db.session.commit()
    return jsonify("Restaurant " + id + " was succesfully deleted!")