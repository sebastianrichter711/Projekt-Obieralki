from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS

conn="postgresql://{0}:{1}@{2}:{3}/{4}".format('postgres','postgres','localhost','5432','twojejedzenie3x')
db = SQLAlchemy()
ma=Marshmallow()
admin=Admin()
APP_SECRET_KEY = 'fTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v'
ACCESS_EXPIRES = timedelta(hours=1)
jwt=JWTManager()
cors = CORS()

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

    from .views_auth import views_auth
    from .views_restaurant import views_restaurant
    from .views_dish import views_dish
    from .views_order import views_order
    from .views_user import views_user

    app.register_blueprint(views_auth, url_prefix='/api/auth')
    app.register_blueprint(views_restaurant, url_prefix='/api/restaurants')
    app.register_blueprint(views_dish, url_prefix='/api/dishes')
    app.register_blueprint(views_order, url_prefix='/api/orders')
    app.register_blueprint(views_user, url_prefix='/api/users')

    admin=Admin(app)

    from .models import User,Restaurant,Dish,Order

    admin.add_view(ModelView(User,db.session))
    admin.add_view(ModelView(Restaurant,db.session))
    admin.add_view(ModelView(Dish,db.session))
    admin.add_view(ModelView(Order,db.session))

    # with app.app_context():
    #     db.drop_all()
    #     db.create_all()

    #create_database(app)

    # login_manager = LoginManager()
    # login_manager.login_view = 'auth.login'
    # login_manager.init_app(app)

    # @login_manager.user_loader
    # def load_user(id):
    #     return User.query.get(int(id))

    return app
