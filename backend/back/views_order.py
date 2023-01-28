from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import order_schema, orders_schema
import uuid
from sqlalchemy import select, update, delete
import sys
from flask_jwt_extended import get_jwt, jwt_required
import json
from fastapi import APIRouter

views_order = Blueprint('views_order', __name__)
orders_router=APIRouter()

@views_order.route('/users/<uuid:user_id>/completed', methods=['GET'])
@orders_router.get("/api/orders/users/{user_id}/completed")
def get_users_orders_completed(user_id):
    all_orders = Order.query.filter(Order.user_id==user_id, Order.is_completed==True)
    if all_orders.count()==0:
        return jsonify("Orders not found"), 404
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/users/<uuid:user_id>/uncompleted', methods=['GET'])
@orders_router.get("/api/orders/users/{user_id}/uncompleted")
def get_users_orders_uncompleted(user_id):
    all_orders = Order.query.filter(Order.user_id==user_id, Order.is_completed==False)
    if all_orders.count()==0:
        return jsonify("Orders not found"), 404
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/complete', methods=['POST'])
@orders_router.post("/api/orders/complete")
def complete_order():

    delivery_address = request.json['deliveryAddress']
    delivery_cost = request.json['deliveryCost']
    dishes_cost = request.json['dishesCost']
    payment_form = request.json['paymentForm']
    restaurant_id = request.json['restaurantId']
    total_cost = request.json['totalCost']
    user_id = request.json['userId']

    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify("User not found"), 404   
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant is None:
            return jsonify("Restaurant not found"), 404  

        order=Order(is_completed=False, user_id=user_id, restaurant_id=restaurant_id)

        db.session.add(order)
        db.session.commit()

        dishes = request.json['dishes']
        print(dishes)
        dishes_list = json.loads(dishes)
        print(type(dishes_list))

        for position in dishes_list:
            print(position)
            new_position = order_dishes.insert().values(order_id=order.id, dish_id=position["id"], count=position["quantity"], price=position["totalPrice"])
            db.session.execute(new_position)
            db.session.commit()

        order.dishes_cost = dishes_cost
        order.delivery_cost = delivery_cost
        order.total_cost = total_cost

        order.delivery_address = delivery_address
        order.payment_form = payment_form
        order.is_completed = True
        order.order_date = datetime.utcnow()

        db.session.commit()

        return order_schema.jsonify(order)
    except:
        return jsonify("Failure in completing an order"), 500

@views_order.route('/', methods=['GET'])
@orders_router.get("/api/orders/")
def get_orders():
    all_orders = Order.query.all()
    if len(all_orders)==0:
        return jsonify("Not found orders"), 404
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/<uuid:order_id>', methods=['GET'])
@orders_router.get("/api/orders/{order_id}")
def get_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify("Order not found"), 404
    return order_schema.jsonify(order)

@views_order.route('/<uuid:order_id>', methods=['PUT'])
@orders_router.put("/api/orders/{order_id}")
def update_order(order_id):

    delivery = request.json['delivery']
    delivery_cost = request.json['delivery_cost']
    dishes_cost = request.json['dishes_cost']
    is_completed = request.json['is_completed']
    order_date = request.json['order_date']
    payment_form = request.json['payment_form']
    total_cost = request.json['total_cost']
    user_id = request.json['user_id']

    try:
        order = Order.query.get(order_id)

        if order is None:
            return jsonify("Order not found"), 404

        order.delivery = delivery
        order.delivery_cost = delivery_cost
        order.dishes_cost = dishes_cost
        order.is_completed = is_completed
        order.order_date = order.order_date
        order.payment_form = payment_form
        order.total_cost = total_cost
        order.user_id = user_id

        db.session.commit()

        return order_schema.jsonify(order)
    except:
        return jsonify("Failure in modifying an order"), 422

@views_order.route('/<uuid:order_id>', methods=["DELETE"])
@orders_router.delete("/api/orders/{order_id}")
def delete_order(order_id):
    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify("Order not found"), 404
        db.session.delete(order)
        db.session.commit()
        return jsonify("Order " + str(order_id) + " was succesfully deleted!")
    except:
        return jsonify("Failure in deleting an order"), 500

