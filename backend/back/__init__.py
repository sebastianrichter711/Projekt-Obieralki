from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
#from flask_login import LoginManager

conn="postgresql://{0}:{1}@{2}:{3}/{4}".format('postgres','postgres','localhost','5432','twojejedzenie3x')
db = SQLAlchemy()
ma=Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = conn
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    ma=Marshmallow(app)

    from .views_auth import views_auth
    from .views_restaurant import views_restaurant
    from .views_dish import views_dish
    from .views_order import views_order
    from .views_user import views_user

    app.register_blueprint(views_auth, url_prefix='/')
    app.register_blueprint(views_restaurant, url_prefix='/')
    app.register_blueprint(views_dish, url_prefix='/')
    app.register_blueprint(views_order, url_prefix='/')
    app.register_blueprint(views_user, url_prefix='/')

    # from .models import User,Restaurant,Dish,Order,OrderDish

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
