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

views_order = Blueprint('views_order', __name__)

@views_order.route('/users/<uuid:user_id>/completed', methods=['GET'])
@jwt_required()
def get_users_orders_completed(user_id):
    all_orders = Order.query.filter(Order.user_id==user_id, Order.is_completed==True)
    if len(all_orders)==0:
        return jsonify("Orders not found"), 404
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/users/<uuid:user_id>/uncompleted', methods=['GET'])
@jwt_required()
def get_users_orders_uncompleted(user_id):
    all_orders = Order.query.filter(Order.user_id==user_id, Order.is_completed==False)
    if len(all_orders)==0:
        return jsonify("Orders not found"), 404
    result = orders_schema.dump(all_orders)
    return jsonify(result)


@views_order.route('/restaurants/<uuid:restaurant_id>', methods=['POST'])
@jwt_required()
def add_dish_to_order(restaurant_id):
    selected_dish_id = uuid.UUID(request.json['dish_id'])
    dish = Dish.query.get(selected_dish_id)
    if dish is None:
        return jsonify("Dish not found"), 404
    count = request.json['count']
    user_id = get_jwt()["id"]
    if user_id is None:
        return jsonify("User is not authorized"), 401
    order = Order.query.filter(Order.restaurant_id==restaurant_id, Order.user_id==user_id,Order.is_completed==False).first()

    try:
        if order is None:
            new_order=Order(is_completed=False, user_id=user_id, restaurant_id=restaurant_id)
            db.session.add(new_order)
            db.session.commit()

            new_position = order_dishes.insert().values(order_id=new_order.id, dish_id=selected_dish_id, count=count, price=count*dish.price)
            db.session.execute(new_position)
            db.session.commit()

            restaurant = Restaurant.query.get(restaurant_id)
            if restaurant is None:
                return jsonify("Restaurant not found"), 404

            stmt = select(order_dishes.columns.price).where(order_dishes.columns.order_id==new_order.id)
            results = db.session.execute(stmt).fetchall()   

            summary_cost=0.0
            for result in results:
                summary_cost += result[0]
        
            new_order.dishes_cost = summary_cost
            if restaurant.is_delivery:
                if summary_cost >= restaurant.min_order_cost_free_delivery and restaurant.min_order_cost_free_delivery is not None:
                    new_order.delivery_cost = 0.0
                else:
                    new_order.delivery_cost = restaurant.delivery_cost
            else:
                new_order.delivery_cost = 0.0
            new_order.total_cost = new_order.dishes_cost + new_order.delivery_cost

            db.session.commit()

            return order_schema.jsonify(new_order), 201
        else:
            new_position = order_dishes.insert().values(order_id=order.id, dish_id=selected_dish_id, count=count, price=count*dish.price)
            db.session.execute(new_position)
            db.session.commit()

            restaurant = Restaurant.query.get(restaurant_id)
            if restaurant is None:
                return jsonify("Restaurant not found"), 404

            stmt = select(order_dishes.columns.price).where(order_dishes.columns.order_id==order.id)
            results = db.session.execute(stmt).fetchall()   

            summary_cost=0.0
            for result in results:
                summary_cost += result[0]
        
            order.dishes_cost = summary_cost
            if restaurant.is_delivery:
                if summary_cost >= restaurant.min_order_cost_free_delivery and restaurant.min_order_cost_free_delivery is not None:
                    order.delivery_cost = 0.0
                else:
                    order.delivery_cost = restaurant.delivery_cost
            else:
                order.delivery_cost=0.0
            order.total_cost = order.dishes_cost + order.delivery_cost

            db.session.commit()
        
            return order_schema.jsonify(order)
    except Exception as err:
        print(type(err))
        return jsonify("Failure in adding a dish to an order"), 422

@views_order.route('/<uuid:order_id>/dishes/<uuid:dish_id>', methods=['PATCH'])
@jwt_required()
def update_dish_in_order(order_id, dish_id):
    count = request.json['count']

    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify("Order not found"), 404
        dish = Dish.query.get(dish_id)
        if dish is None:
            return jsonify("Dish not found"), 404
        stmt = update(order_dishes).where(order_dishes.c.order_id==order_id and order_dishes.c.dish_id==dish_id).values(count=count,price=dish.price*count)
        db.session.execute(stmt)
        db.session.commit()

        restaurant = Restaurant.query.get(dish.restaurant_id)
        if restaurant is None:
            return jsonify("Restaurant not found"), 404

        stmt = select(order_dishes.columns.price).where(order_dishes.columns.order_id==order_id)
        results = db.session.execute(stmt).fetchall()   

        summary_cost=0.0
        for result in results:
            summary_cost += result[0]
        
        order.dishes_cost = summary_cost
        if restaurant.is_delivery:
            if summary_cost >= restaurant.min_order_cost_free_delivery and restaurant.min_order_cost_free_delivery is not None:
                order.delivery_cost = 0.0
            else:
                order.delivery_cost = restaurant.delivery_cost
        else:
            order.delivery_cost=0.0
        order.total_cost = order.dishes_cost + order.delivery_cost

        db.session.commit()

        return jsonify("An order was updated")
    except:
        return jsonify("Failure in updating an order"), 422

@views_order.route('/<uuid:order_id>/dishes/<uuid:dish_id>', methods=['DELETE'])
@jwt_required()
def delete_dish_from_order(order_id, dish_id):
    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify("Order not found"), 404
        dish = Dish.query.get(dish_id)
        if dish is None:
            return jsonify("Dish not found"), 404        
        order.order_dishes.remove(dish)
        db.session.commit()

        if len(order.order_dishes)==0:
            db.session.delete(order)
            db.session.commit()
            return jsonify("Order was deleted")

        restaurant = Restaurant.query.get(dish.restaurant_id)
        if restaurant is None:
            return jsonify("Restaurant not found"), 404

        stmt = select(order_dishes.columns.price).where(order_dishes.columns.order_id==order_id)
        results = db.session.execute(stmt).fetchall()   

        summary_cost=0.0
        for result in results:
            summary_cost += result[0]
        
        order.dishes_cost = summary_cost
        if restaurant.is_delivery:
            if summary_cost >= restaurant.min_order_cost_free_delivery and restaurant.min_order_cost_free_delivery is not None:
                order.delivery_cost = 0.0
            else:
                order.delivery_cost = restaurant.delivery_cost
        else:
            order.delivery_cost=0.0
        order.total_cost = order.dishes_cost + order.delivery_cost

        db.session.commit()

        return jsonify("It was deleted " + dish.name + "from order " + str(order_id))
    except:
        return jsonify("Failure in deleting a dish from an order"), 500

@views_order.route('/<uuid:order_id>/restaurants/<uuid:restaurant_id>/accept-basket', methods=['GET'])
@jwt_required()
def accept_basket_of_order(order_id, restaurant_id):
    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify("Order not found"), 404
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant is None:
            return jsonify("Restaurant not found"), 404 
        if restaurant.is_delivery:
            if order.dishes_cost >= restaurant.min_order_cost:
                return jsonify("Basket was accepted!")
            else:
                return jsonify("Summary dishes cost is too low. Minimum order cost for this restaurant is equal " + restaurant.min_order_cost), 600
        return jsonify("Basket was accepted")
    except Exception as err:
        print(err)
        return jsonify("Failure in calculating a dishes cost in an order"), 500

@views_order.route('/<uuid:order_id>/complete', methods=['POST'])
@jwt_required()
def complete_order(order_id):

    delivery_address = request.json['delivery_address']
    payment_form = request.json['payment_form']

    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify("Order not found"), 404

        order.delivery_address = delivery_address
        order.payment_form = payment_form
        order.is_completed = True
        order.order_date = datetime.utcnow()

        db.session.commit()

        return order_schema.jsonify(order)
    except:
        return jsonify("Failure in completing an order"), 500


@views_order.route('', methods=['GET'])
def get_orders():
    all_orders = Order.query.all()
    if len(all_orders)==0:
        return jsonify("Not found orders"), 404
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/<uuid:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify("Order not found"), 404
    return order_schema.jsonify(order)

@views_order.route('/<uuid:order_id>', methods=['PUT'])
@jwt_required()
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
@jwt_required()
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

