import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
import secrets
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID
import uuid

from sqlalchemy.sql import func

conn="mysql://{0}:{1}@{2}/{3}".format('root','********','localhost','twojejedzenie3x')


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class GUID(TypeDecorator):
    """Platform-independent GUID type.

    Uses Postgresql's UUID type, otherwise uses
    CHAR(32), storing as stringified hex values.

    """
    impl = CHAR

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value)
            else:
                # hexstring
                return "%.32x" % value

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            return uuid.UUID(value)


class Student(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))
    active = db.Column(db.Boolean, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    authorize_date = db.Column(db.DateTime(timezone=True), nullable=True)
    birth_date = db.Column(db.DateTime(timezone=True), nullable=False)
    date_created = db.Column(db.DateTime(timezone=True),server_default=func.now())
    date_of_last_login = db.Column(db.DateTime(timezone=True),server_default=func.now())
    email=db.Column(db.String(200), unique=True, nullable=False)
    end_authorize_date = db.Column(db.DateTime(timezone=True), nullable=True)
    is_2FA_enabled = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(14), nullable=False)
    role = db.Column(db.Enum('admin', 'moderator', 'user', name='user_role'), index=True)
    surname = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f'<Student {self.firstname}>'

class Order(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))

class Dish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))

class Restaurant(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))

class OrderDish(db.Model):
    id = db.Column(GUID(), primary_key=True, default=lambda: str(uuid.uuid4()))



