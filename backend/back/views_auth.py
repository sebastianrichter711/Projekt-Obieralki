from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash
from .models import *
from . import db
import jwt
from .__init__ import APP_SECRET_KEY,jwt
import datetime
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from fastapi import APIRouter, Body, Request, Response
from .openapi_schemas import LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest
import re

views_auth = Blueprint('views_auth', __name__)
auth_router = APIRouter()

def validate_password(password):
    special_chars=['@', '#', '$', '%', '^', '&', '+', '=', '*']
    lower_case=False
    upper_case=False
    number=False
    special_char=False

    for el in password:
        if 'a' <= el <= 'z':
            lower_case=True
        if 'A' <= el <= 'Z':
            upper_case=True
        if '0' <= el <= '9':
            number=True
        if el in special_chars:
            special_char=True

    if lower_case==True and upper_case==True and number==True and special_char==True:
        return True
    else:
        return False 

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def is_valid_email(email):
    if re.fullmatch(regex, email):
        return True
    else:
        return False
    
@views_auth.route('/forgot-password', methods=['POST'])
@auth_router.post('/api/auth/forgot-password', tags=["Auth"], description="Endpoint for reset user password", 
responses={200: {"description": "User password was reset"}, 404: {"description": "Not found user with given email"}, 500: {"description":"Internal server error"}})
def forgot_password(forgotPassRequest: ForgotPasswordRequest = Body(description="Forgot password request")):
    user = User.query.filter(User.email==request.json["email"]).first()
    if user is None:
        return jsonify("User with email " + request.json["email"] + "not_found"), 404
    user.pass_reset_token = create_access_token(identity="identity_user")
    db.session.commit()
    return jsonify(user.pass_reset_token)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

@views_auth.route('/login', methods=['POST'])
@auth_router.post('/api/auth/login', tags=["Auth"], description="User login", 
responses={200: {"description": "User was logged in, returned access token"}, 400: {"description": "Error validation in given data"}, 
404: {"description": "Not found user with given email or/and password"}, 500: {"description":"Internal server error"}})
def login(loginRequest: LoginRequest = Body(description="Login request")):
    email = request.json['email']
    password = request.json['password']

    user=User.query.filter_by(email=email).first_or_404()

    if not user.verify_password(password):
        return jsonify("Podane dane uwierzytelniające są nieprawidłowe!"), 403

    additional_claims = {"id": str(user.id), "role": str(user.role)}
    access_token = create_access_token(identity="identity_user", additional_claims=additional_claims)

    user.date_of_last_login = datetime.datetime.utcnow()
    db.session.commit()

    return jsonify({"accessToken": access_token}), 200

@views_auth.route('/logout', methods=['POST'])
@auth_router.post('/api/auth/logout', tags=["Auth"], description="User logout", 
responses={204: {"description": "User was correctly logged out"}, 401: {"description": "Returns unauthorized user"}, 
404: {"description": "Not found user with given token"}, 500: {"description": "Internal server error"}})
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    print(jti)
    now = datetime.datetime.utcnow()
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify(msg="JWT revoked")

@views_auth.route('/reset-password', methods=['POST'])
@auth_router.post('/api/auth/reset-password', tags=["Auth"], description="User change password", 
responses={200: {"description": "User password was changed"}, 400: {"description": "Error validation in given passwords"}, 
404: {"description": "Not found user with given token"}, 500: {"description":"Internal server error"}})
def reset_password(resetPassRequest: ResetPasswordRequest = Body(description="Reset password request")):
    user = User.query.filter(User.pass_reset_token==request.json["token"]).first()
    if user is None:
        return jsonify("User not found"), 404

    password = request.json["password"]
    password_again = request.json["password_again"]

    if password != password_again:
        return jsonify('Passwords don\'t match.'), 400
    elif len(password) < 8:
        return jsonify('Password must be at least 8 characters.'),400
    elif validate_password(password)!=True:
        return jsonify('Password does not meet requirements from change password page.'),400
    user.pass_reset_token = ""
    user.password = generate_password_hash(password, method='sha256')
    db.session.commit()
    return jsonify("Password successfully reset.")

@views_auth.route('/register', methods=['POST'])
@auth_router.post('/api/auth/register', tags=["Auth"], description="User registration", 
responses={201: {"description": "User was created"}, 400: {"description": "Error validation in given data"}, 
500: {"description":"Internal server error"}})
def register(registerRequest: RegisterRequest = Body(description="Register request")):
    active = request.json['active']
    email = request.json['email']
    password = request.json['password']
    password_again = request.json['password_again']
    role = request.json['role']
    authorize_date = request.json['authorize_date']
    end_authorize_date = request.json['end_authorize_date']

    print(type(authorize_date))
    print(type(end_authorize_date))

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify('Email already exists.'), 400
    elif is_valid_email(email)!=True:
        return jsonify('Email must not meet requirements.'), 400
    elif password != password_again:
        return jsonify('Passwords don\'t match.'), 400
    elif len(password) < 8:
        return jsonify('Password must be at least 8 characters.'),400
    elif validate_password(password)!=True:
        return jsonify('Password does not meet requirements from register page.'),400
    else:
        new_user = User(active=True, date_created=datetime.datetime.utcnow(), email=email, password=generate_password_hash(
            password, method='sha256'),role=role, authorize_date=authorize_date, end_authorize_date=end_authorize_date)
        db.session.add(new_user)
        db.session.commit()
        print(new_user)
        return jsonify("A new user " + email + " was created!"), 201

    return jsonify("Register error"), 500