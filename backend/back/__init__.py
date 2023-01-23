from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_jwt_extended import JWTManager
from datetime import timedelta
import datetime
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from flask_swagger_ui import get_swaggerui_blueprint

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

    @app.route('/static/<path:path>')
    def send_static(path):
        return send_from_directory('static', path)

    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'
    SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "backend"
        }
    )

    app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

    with app.app_context():
        admins = User.query.filter(User.role=='admin')
        if admins.count()==0:
            admin = User(active=True, date_created=datetime.datetime.utcnow(), email="admin@admin.pl", password=generate_password_hash(
                "admin", method='sha256'),role="admin",authorize_date=datetime.datetime.utcnow(), end_authorize_date=datetime.datetime(2050,1,1,23,59,59))

            db.session.add(admin)
            db.session.commit()

    return app
