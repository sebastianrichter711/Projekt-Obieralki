from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash
from .models import *
from . import db
import jwt
from .__init__ import APP_SECRET_KEY
import datetime

views_auth = Blueprint('views_auth', __name__)

#@views_auth.route('/forgot-password', methods=['POST'])
#def forgot_password():

@views_auth.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user=User.query.filter_by(email=email).first_or_404()

    if not user.verify_password(password):
        return jsonify("Podane dane uwierzytelniające są nieprawidłowe!"), 403

    payload = {
        "id": str(user.id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    }
    token = jwt.encode(payload, APP_SECRET_KEY)

    return jsonify({"token":token}), 200


# @views_auth.route('/logout', methods=['POST'])
# def logout():
    
# @views_auth.route('/reset-password', methods=['POST'])
# def reset_password():

@views_auth.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    password_again = request.json['password_again']

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify('Email already exists.'), 400
    elif len(email) < 4:
        return jsonify('Email must be greater than 3 characters.'), 400
    elif password != password_again:
        return jsonify('Passwords don\'t match.'), 400
    elif len(password) < 8:
        return jsonify('Password must be at least 8 characters.'),400
    else:
        new_user = User(active=True, date_created=datetime.now(), email=email, password=generate_password_hash(
            password, method='sha256'),role='user')
        db.session.add(new_user)
        db.session.commit()
        return jsonify("A new user " + email + " was created!"), 201

    return jsonify("Only POST request is allowed"), 500
    
    
    