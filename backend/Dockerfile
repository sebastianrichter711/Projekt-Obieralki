FROM python:3.11
RUN pip3 install fastapi uvicorn flask flask_sqlalchemy Flask-SQLAlchemy flask_marshmallow flask_jwt_extended flask_cors werkzeug psycopg2
COPY . . 
CMD ["uvicorn", "app:app", "--host", "127.0.0.1", "--port", "5000"]