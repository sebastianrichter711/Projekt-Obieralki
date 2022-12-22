@app.route('/dish', methods=['POST'])
def add_dish():
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

    new_dish = Dish(active,address,authorize_date,birth_date,date_created,date_of_last_login,email,
    end_authorize_date,name,password,phone,role,surname)

    db.session.add(new_dish)
    db.session.commit()

    return dish_schema.jsonify(new_dish)

@app.route('/all_dishes', methods=['GET'])
def get_dishes():
    all_dishes = Dish.query.all()
    result = dishes_schema.dump(all_dishes)
    return jsonify(result)

@app.route('/dish/<id>', methods=['GET'])
def get_dish(id):
    dish = Dish.query.get(id)
    return dish_schema.jsonify(dish)

@app.route('/dish/<id>', methods=['PUT'])
def update_dish(id):

    dish = Dish.query.get(id)

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

    dish.active = active
    dish.address = address
    dish.authorize_date = authorize_date
    dish.birth_date = birth_date
    dish.date_created = user.date_created
    dish.date_of_last_login = user.date_of_last_login
    dish.email = email
    dish.end_authorize_date = user.end_authorize_date
    dish.name = name
    dish.password = user.password
    dish.phone = phone
    dish.role = role
    dish.surname = surname

    db.session.commit()

    return dish_schema.jsonify(dish)

@app.route('/dish/<id>', methods=["DELETE"])
def delete_dish(id):
    dish = Dish.query.get(id)
    db.session.delete(dish)
    db.session.commit()
    return jsonify("Dish " + id + " was succesfully deleted!")