@app.route('/order', methods=['POST'])
def add_order():
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

    new_order = Order(active,address,authorize_date,birth_date,date_created,date_of_last_login,email,
    end_authorize_date,name,password,phone,role,surname)

    db.session.add(new_order)
    db.session.commit()

    return order_schema.jsonify(new_order)

@app.route('/all_orders', methods=['GET'])
def get_orders():
    all_orders = Order.query.all()
    result = orders_schema.dump(all_orders)
    return jsonify(result)

@app.route('/order/<id>', methods=['GET'])
def get_order(id):
    order = Order.query.get(id)
    return order_schema.jsonify(order)

@app.route('/order/<id>', methods=['PUT'])
def update_order(id):

    order = Order.query.get(id)

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

    order.active = active
    order.address = address
    order.authorize_date = authorize_date
    order.birth_date = birth_date
    order.date_created = user.date_created
    order.date_of_last_login = user.date_of_last_login
    order.email = email
    order.end_authorize_date = user.end_authorize_date
    order.name = name
    order.password = user.password
    order.phone = phone
    order.role = role
    order.surname = surname

    db.session.commit()

    return order_schema.jsonify(order)

@app.route('/order/<id>', methods=["DELETE"])
def delete_order(id):
    order = Order.query.get(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify("Order " + id + " was succesfully deleted!")