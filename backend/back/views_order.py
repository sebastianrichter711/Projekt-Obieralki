from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db
from .schemas import order_schema, orders_schema
import uuid
from sqlalchemy import select, update, delete


views_order = Blueprint('views_order', __name__)

@views_order.route('/all_orders/completed/<uuid:id>', methods=['GET'])
def get_users_orders_completed(id):
    all_orders = Order.query.filter(Order.user_id==id, Order.is_completed==True)
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/all_orders/uncompleted/<uuid:id>', methods=['GET'])
def get_users_orders_uncompleted(id):
    all_orders = Order.query.filter(Order.user_id==id, Order.is_completed==False)
    result = orders_schema.dump(all_orders)
    return jsonify(result)


@views_order.route('/add_dish_to_order/<uuid:restaurant_id>/<uuid:user_id>', methods=['POST'])
def add_dish_to_order(restaurant_id, user_id):
    order = Order.query.filter(Order.restaurant_id==restaurant_id, Order.user_id==user_id,Order.is_completed==False).first()
    selected_dish_id = uuid.UUID(request.json['dish_id'])
    dish = Dish.query.get(selected_dish_id)
    count = request.json['count']

    if order is None:
        new_order=Order(is_completed=False, user_id=user_id, restaurant_id=restaurant_id)
        db.session.add(new_order)
        db.session.commit()

        new_position = order_dishes.insert().values(order_id=new_order.id, dish_id=selected_dish_id, count=count, price=count*dish.price)
        db.session.execute(new_position)
        db.session.commit()

        return order_schema.jsonify(new_order)
    else:
        new_position = order_dishes.insert().values(order_id=order.id, dish_id=selected_dish_id, count=count, price=count*dish.price)
        db.session.execute(new_position)
        db.session.commit()
        
        return order_schema.jsonify(order)

@views_order.route('/update_order/<uuid:order_id>/<uuid:dish_id>', methods=['POST'])
def update_count_of_dish(order_id, dish_id):
    order = Order.query.get(order_id)
    dish = Dish.query.get(dish_id)
    count = request.json['count']
    stmt = update(order_dishes).where(order_dishes.c.order_id==order_id and order_dishes.c.dish_id==dish_id).values(count=count,price=dish.price*count)
    db.session.execute(stmt)
    db.session.commit()

    return jsonify("Zaktualizowano zamówienie")

@views_order.route('/delete_dish_from_order/<uuid:order_id>/<uuid:dish_id>', methods=['DELETE'])
def delete_dish_from_order(order_id, dish_id):
    order = Order.query.get(order_id)
    dish = Dish.query.get(dish_id)
    order.order_dishes.remove(dish)
    db.session.commit()

    return jsonify("Usunięto " + dish.name + "z zamowienia ")


@views_order.route('/complete_order/<uuid:order_id>', methods=['POST'])
def complete_order(order_id):
    order = Order.query.get(order_id)
    restaurant = Restaurant.query.get(order.restaurant_id)

    order.delivery_address = request.json['delivery_address']
    order.delivery_cost = restaurant.delivery_cost

    stmt = select(order_dishes.columns.price).where(order_dishes.columns.order_id==order_id)
    results = db.session.execute(stmt).fetchall()

    summary_cost=0.0
    for result in results:
        summary_cost += result[0]

    order.dishes_cost = summary_cost
    order.total_cost = order.dishes_cost + order.delivery_cost
    order.payment_form = request.json['payment_form']
    order.is_completed = True
    order.order_date = datetime.utcnow()

    db.session.commit()

    return order_schema.jsonify(order)


@views_order.route('/all_orders', methods=['GET'])
def get_orders():
    all_orders = Order.query.all()
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@views_order.route('/order/<id>', methods=['GET'])
def get_order(id):
    order = Order.query.get(id)
    return order_schema.jsonify(order)

@views_order.route('/order/<id>', methods=['PUT'])
def update_order(id):

    order = Order.query.get(id)

    delivery = request.json['delivery']
    delivery_cost = request.json['delivery_cost']
    dishes_cost = request.json['dishes_cost']
    is_completed = request.json['is_completed']
    order_date = datetime.now()
    payment_form = request.json['payment_form']
    total_cost = request.json['total_cost']
    user_id = request.json['user_id']

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

@views_order.route('/order/<id>', methods=["DELETE"])
def delete_order(id):
    order = Order.query.get(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify("Order " + id + " was succesfully deleted!")