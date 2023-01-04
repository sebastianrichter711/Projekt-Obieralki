from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash
from .models import *
from . import db
import jwt
from .__init__ import APP_SECRET_KEY,jwt
import datetime
from flask_jwt_extended import create_access_token, get_jwt, jwt_required

views_auth = Blueprint('views_auth', __name__)

#@views_auth.route('/forgot-password', methods=['POST'])
#def forgot_password():

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

@views_auth.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user=User.query.filter_by(email=email).first_or_404()

    if not user.verify_password(password):
        return jsonify("Podane dane uwierzytelniające są nieprawidłowe!"), 403

    access_token = create_access_token(identity="example_user")

    user.date_of_last_login = datetime.datetime.utcnow()
    db.session.commit()

    return jsonify({"token":access_token}), 200

@views_auth.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    print(jti)
    now = datetime.datetime.utcnow()
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify(msg="JWT revoked")

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
        new_user = User(active=True, date_created=datetime.datetime.utcnow(), email=email, password=generate_password_hash(
            password, method='sha256'),role='user')
        db.session.add(new_user)
        db.session.commit()
        return jsonify("A new user " + email + " was created!"), 201

    return jsonify("Register error"), 500
    
    
    