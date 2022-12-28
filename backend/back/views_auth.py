from flask import Flask,request,jsonify,Blueprint
from flask_marshmallow import Marshmallow
from datetime import datetime
from .models import *
from . import db

views_auth = Blueprint('views_auth', __name__)

#@views_auth.route('/forgot-password', methods=['POST'])
#def forgot_password():

# @views_auth.route('/login', methods=['POST'])
# def login():

# @views_auth.route('/logout', methods=['POST'])
# def logout():

# @views_auth.route('/reset-password', methods=['POST'])
# def reset_password():

# @views_auth.route('/register', methods=['POST'])
# def register():
    #username=request.json['username']
    #password=request.json['password']

    
    
    