from pydantic import BaseModel, EmailStr
import datetime
from typing import Optional
from pydantic.types import conint

class LoginRequest(BaseModel):
    email: str = "user@wp.pl"
    password: str = "User123$"

class RegisterRequest(BaseModel):
    email: str = "user@wp.pl"
    password: str = "User123$"
    password_again: str = "User123$"
    role:str = "user"
    authorize_date:str = ""
    end_authorize_date:str = ""
    active:bool = True

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    password: str
    password_again: str

class DishRequest(BaseModel):

    description:str
    dish_subtype:str
    dish_type:str
    meat_types:list
    name:str
    pizza_diameter:float
    price:float
    restaurant_id:str
    sauces:list
    
class OrderRequest(BaseModel):

    id:str
    delivery_address:str
    delivery_cost:float
    dishes_cost:float
    is_completed:bool
    order_date:datetime.datetime
    payment_form:str
    total_cost:float
    user_id:str
    restaurant_id:str
    order_dishes:list
    
class RestaurantRequest(BaseModel):
    address:str
    delivery_cost:float
    description:str
    discounts:list
    dishes:list
    is_delivery:bool
    kitchen_type:str
    logo:str
    min_order_cost:float
    min_order_cost_free_delivery:float
    name:str
    phone:str
    waiting_time_for_delivery:str
    moderator_id:str
    orders:list

class UserRequest(BaseModel):
    active:bool
    address:str
    authorize_date:datetime.datetime
    birth_date:datetime.date
    date_created:datetime.datetime
    date_of_last_login:datetime.datetime
    email:str
    end_authorize_date:datetime.datetime
    name:str
    phone:str
    role:str
    surname:str
    orders:list
    restaurants:list

class CompleteOrderRequest(BaseModel):

    delivery_address:str
    delivery_cost:float
    dishes:list
    dishes_cost:float
    payment_form:str
    restaurant_id:str
    total_cost:float
    user_id:str
    
