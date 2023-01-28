from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import restaurant_schema, restaurants_schema
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from fastapi import APIRouter, Body
from .openapi_schemas import RestaurantRequest


views_restaurant = Blueprint('views_restaurant', __name__)
restaurants_router=APIRouter()

@views_restaurant.route('', methods=['POST'])
@restaurants_router.post("/api/restaurants")
def add_restaurant(restaurantRequest: RestaurantRequest=Body()):
    address = request.json['address']
    delivery_cost = request.json['delivery_cost']
    description = request.json['description']
    discounts = list(request.json['discounts'])
    dishes = list(request.json['dishes'])
    is_delivery = request.json['is_delivery']
    kitchen_type = request.json['kitchen_type']
    logo = request.json['logo']
    min_order_cost = request.json['min_order_cost']
    min_order_cost_free_delivery = request.json['min_order_cost_free_delivery']
    name = request.json['name']
    phone = request.json['phone']
    waiting_time_for_delivery = request.json['waiting_time_for_delivery']
    moderator_id = request.json['moderator_id']
    orders = []

    if is_delivery == "on":
        is_delivery = True
    else:
        is_delivery = False

    try:
        new_restaurant = Restaurant(address,delivery_cost,description,discounts,dishes,is_delivery,kitchen_type,logo,min_order_cost,
        min_order_cost_free_delivery,name,phone,waiting_time_for_delivery,moderator_id,orders)

        db.session.add(new_restaurant)
        db.session.commit()

        return restaurant_schema.jsonify(new_restaurant), 201
    except Exception as e:
        print(e)
        return jsonify("Error in adding a restaurant"), 422

@views_restaurant.route('/', methods=['GET'])
@restaurants_router.get("/api/restaurants")
def get_restaurants():
    all_restaurants = Restaurant.query.all()
    if len(all_restaurants)==0:
        return jsonify("Restaurants not found"), 404
    result = restaurants_schema.dump(all_restaurants)
    return jsonify(result)

@views_restaurant.route('/<location>', methods=['GET'])
@restaurants_router.get("/api/restaurants/{location}")
def get_all_restaurants_by_name_or_location(location):
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

    if len(results)==0:
        return jsonify("Restaurants with given name/location not found"), 404
    else:
        result_of_search = restaurants_schema.dump(results)
        return jsonify(result_of_search)

@views_restaurant.route('/one/<uuid:restaurant_id>', methods=['GET'])
@restaurants_router.get("/api/restaurants/one/{restaurant_id}")
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant is None:
        return jsonify("Restaurant not found"), 404
    return restaurant_schema.jsonify(restaurant)

@views_restaurant.route('/<uuid:restaurant_id>', methods=['PUT'])
@restaurants_router.put("/api/restaurants/{restaurant_id}")
def update_restaurant(restaurant_id, restaurantRequest: RestaurantRequest=Body()):

    address = request.json['address']
    delivery_cost = request.json['delivery_cost']
    description = request.json['description']
    is_delivery = request.json['is_delivery']
    kitchen_type = request.json['kitchen_type']
    logo = request.json['logo']
    min_order_cost = request.json['min_order_cost']
    min_order_cost_free_delivery = request.json['min_order_cost_free_delivery']
    name = request.json['name']
    phone = request.json['phone']
    waiting_time_for_delivery = request.json['waiting_time_for_delivery']
    moderator_id = request.json['moderator_id']

    try:
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant is None:
            return jsonify("Restaurant not found"), 404

        restaurant.address = address
        restaurant.delivery_cost = delivery_cost
        restaurant.description = description
        restaurant.discounts = restaurant.discounts
        restaurant.dishes = restaurant.dishes
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
    except Exception as e:
        print(e)
        return jsonify("Failure in modifying a restaurant"), 422


@views_restaurant.route('/<uuid:restaurant_id>', methods=["DELETE"])
@restaurants_router.delete("/api/restaurants/{restaurant_id}")
def delete_restaurant(restaurant_id):
    try:
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant is None:
            return jsonify("Restaurant not found"), 404
        db.session.delete(restaurant)
        db.session.commit()
        return jsonify("Restaurant " + str(restaurant_id) + " was succesfully deleted!")
    except Exception as e:
        print(e)
        return jsonify("Failure in deleting a restaurant"), 422
