from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_jwt_extended import JWTManager
from datetime import timedelta
import datetime
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from fastapi import FastAPI,Request
import uvicorn
from fastapi.middleware.wsgi import WSGIMiddleware  
from .

conn="postgresql+psycopg2://{0}:{1}@{2}:{3}/{4}".format('postgres','postgres',os.environ['DB_HOST'],os.environ['DB_PORT'],'example')

tags_metadata = [
    {
        "name": "Auth",
        "description": "Requests (API) for user authentication/authorization.",
    },
    {
        "name": "Users",
        "description": "Requests (API) for management of users data.",
    },
    {
        "name": "Orders",
        "description": "Requests (API) for management of orders data and completing orders.",
    },
    {
        "name": "Restaurants",
        "description": "Requests (API) for management of restaurants data",
    },
    {
        "name": "Dishes",
        "description": "Requests (API) for management of dishes data",
    },
]


db = SQLAlchemy()
ma=Marshmallow()
APP_SECRET_KEY = 'fTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v'
ACCESS_EXPIRES = timedelta(hours=1)
jwt=JWTManager()
cors = CORS()
fastapi = FastAPI()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = conn
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'fTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v'
    app.config['JWT_SECRET_KEY'] = '+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
    db.init_app(app)
    ma=Marshmallow(app)
    jwt=JWTManager(app)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    fastapi = FastAPI(openapi_tags=tags_metadata)
    fastapi.mount("/", WSGIMiddleware(app))

    from .views_auth import views_auth, auth_router
    from .views_restaurant import views_restaurant, restaurants_router
    from .views_dish import views_dish, dishes_router
    from .views_order import views_order, orders_router
    from .views_user import views_user, users_router

    app.register_blueprint(views_auth, url_prefix='/api/auth')
    app.register_blueprint(views_restaurant, url_prefix='/api/restaurants')
    app.register_blueprint(views_dish, url_prefix='/api/dishes')
    app.register_blueprint(views_order, url_prefix='/api/orders')
    app.register_blueprint(views_user, url_prefix='/api/users')

    fastapi.include_router(auth_router)
    fastapi.include_router(restaurants_router)
    fastapi.include_router(dishes_router)
    fastapi.include_router(orders_router)
    fastapi.include_router(users_router)

    from .models import User,Restaurant,Dish,Order

    with app.app_context():

        db.create_all()

        admins = User.query.filter(User.role=='admin')
        if admins.count()==0:
            admin = User(active=True, date_created=datetime.datetime.utcnow(), email="admin@admin.pl", password=generate_password_hash(
                "admin", method='sha256'),role="admin",authorize_date=datetime.datetime.utcnow(), end_authorize_date=datetime.datetime(2050,1,1,23,59,59))

            db.session.add(admin)
            db.session.commit()

    return fastapi
