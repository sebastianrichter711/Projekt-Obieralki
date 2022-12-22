@app.route('/restaurant', methods=['POST'])
def add_restaurant():
    active = request.json['active']
    address = request.json['address']
    authorize_date = request.json['authorize_date']
    birth_date = request.json['birth_date']
    date_created = datetime.now()
    date_of_last_login = None
    email = request.json['email']
    end_authorize_date = request.json['end_authorize_date']
    name = request.json['name']
    password = 'xxx'
    phone = request.json['phone']
    role = request.json['role']
    surname = request.json['surname']

    new_restaurant = Restaurant(active,address,authorize_date,birth_date,date_created,date_of_last_login,email,
    end_authorize_date,name,password,phone,role,surname)

    db.session.add(new_restaurant)
    db.session.commit()

    return restaurant_schema.jsonify(new_restaurant)

@app.route('/all_restaurants', methods=['GET'])
def get_restaurants():
    all_restaurants = Restaurant.query.all()
    result = restaurants_schema.dump(all_restaurants)
    return jsonify(result)

@app.route('/restaurant/<id>', methods=['GET'])
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    return restaurant_schema.jsonify(restaurant)

@app.route('/restaurant/<id>', methods=['PUT'])
def update_restaurant(id):

    restaurant = Restaurant.query.get(id)

    active = request.json['active']
    address = request.json['address']
    authorize_date = request.json['authorize_date']
    birth_date = request.json['birth_date']
    email = request.json['email']
    end_authorize_date = request.json['end_authorize_date']
    name = request.json['name']
    phone = request.json['phone']
    role = request.json['role']
    surname = request.json['surname']

    restaurant.active = active
    restaurant.address = address
    restaurant.authorize_date = authorize_date
    restaurant.birth_date = birth_date
    restaurant.date_created = user.date_created
    restaurant.date_of_last_login = user.date_of_last_login
    restaurant.email = email
    restaurant.end_authorize_date = user.end_authorize_date
    restaurant.name = name
    restaurant.password = user.password
    restaurant.phone = phone
    restaurant.role = role
    restaurant.surname = surname

    db.session.commit()

    return restaurant_schema.jsonify(restaurant)

@app.route('/restaurant/<id>', methods=["DELETE"])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    db.session.delete(restaurant)
    db.session.commit()
    return jsonify("Restaurant " + id + " was succesfully deleted!")