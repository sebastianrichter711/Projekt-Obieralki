from .__init__ import ma
from .models import User,Restaurant,Dish,Order

class DishSchema(ma.Schema):

    id=ma.String(dump_only=True)
    description=ma.String()
    dish_subtype=ma.String()
    dish_type=ma.String()
    meat_types=ma.List(ma.String)
    name=ma.String()
    pizza_diameter=ma.Float()
    price=ma.Float()
    restaurant_id=ma.String()
    sauces=ma.List(ma.String)
    
class OrderSchema(ma.Schema):

    id=ma.String(dump_only=True)
    delivery_address=ma.String()
    delivery_cost=ma.Float()
    dishes_cost=ma.Float()
    is_completed=ma.Boolean()
    order_date=ma.DateTime()
    payment_form=ma.String()
    total_cost=ma.Float()
    user_id=ma.String()
    restaurant_id=ma.String()
    order_dishes=ma.Nested(DishSchema,many=True)
    
class RestaurantSchema(ma.Schema):
    id = ma.String(dump_only=True)
    address = ma.String()
    delivery_cost = ma.Float()
    description = ma.String()
    discounts = ma.List(ma.String)
    dishes = ma.Nested(DishSchema, many=True)
    is_delivery = ma.Boolean()
    kitchen_type = ma.String()
    logo = ma.String()
    min_order_cost = ma.Float()
    min_order_cost_free_delivery = ma.Float()
    name = ma.String()
    phone = ma.String()
    waiting_time_for_delivery = ma.String()
    moderator_id = ma.String()
    orders=ma.Nested(OrderSchema,many=True)


class UserSchema(ma.Schema):
    id=ma.String(dump_only=True)
    active=ma.Boolean()
    address=ma.String()
    authorize_date=ma.DateTime()
    birth_date=ma.DateTime()
    date_created=ma.DateTime()
    date_of_last_login=ma.DateTime()
    email=ma.String()
    end_authorize_date=ma.String()
    name=ma.String()
    phone=ma.String()
    role=ma.String()
    surname=ma.String()
    orders=ma.Nested(OrderSchema,many=True)
    restaurants=ma.Nested(RestaurantSchema,many=True)

        

user_schema = UserSchema()
users_schema = UserSchema(many=True)

restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)

dish_schema = DishSchema()
dishes_schema = DishSchema(many=True)

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)