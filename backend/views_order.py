@app.route('/order', methods=['POST'])
def add_order():
    delivery = request.json['delivery']
    delivery_cost = request.json['delivery_cost']
    dishes_cost = request.json['dishes_cost']
    is_completed = request.json['is_completed']
    order_date = datetime.now()
    payment_form = request.json['payment_form']
    total_cost = request.json['total_cost']
    user_id = request.json['user_id']

    new_order = Order(delivery,delivery_cost,dishes_cost,is_completed,order_date,payment_form,total_cost,user_id)

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

    delivery = request.json['delivery']
    delivery_cost = request.json['delivery_cost']
    dishes_cost = request.json['dishes_cost']
    is_completed = request.json['is_completed']
    order_date = datetime.now()
    payment_form = request.json['payment_form']
    total_cost = request.json['total_cost']
    user_id = request.json['user_id']

    order.delivery = delivery
    order.delivery_cost = delivery_cost
    order.dishes_cost = dishes_cost
    order.is_completed = is_completed
    order.order_date = order.order_date
    order.payment_form = payment_form
    order.total_cost = total_cost
    order.user_id = user_id

    db.session.commit()

    return order_schema.jsonify(order)

@app.route('/order/<id>', methods=["DELETE"])
def delete_order(id):
    order = Order.query.get(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify("Order " + id + " was succesfully deleted!")