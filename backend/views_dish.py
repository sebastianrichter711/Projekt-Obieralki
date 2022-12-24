@app.route('/dish', methods=['POST'])
def add_dish():
    description = request.json['description']
    dish_subtype = request.json['dish_subtype']
    dish_type = request.json['dish_type']
    meat_types = request.json['meat_types']
    name = request.json['name']
    pizza_diameter = request.json['pizza_diameter']
    price = request.json['price']
    restaurant_id = request.json['restaurant_id']
    sauces = request.json['sauces']

    new_dish = Dish(description,dish_subtype,dish_type,meat_types,name,pizza_diameter,price,restaurant_id,sauces)

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

    description = request.json['description']
    dish_subtype = request.json['dish_subtype']
    dish_type = request.json['dish_type']
    meat_types = request.json['meat_types']
    name = request.json['name']
    pizza_diameter = request.json['pizza_diameter']
    price = request.json['price']
    restaurant_id = request.json['restaurant_id']
    sauces = request.json['sauces']

    dish.description = description
    dish.dish_subtype = dish_subtype
    dish.dish_type = dish_type
    dish.meat_types = meat_types
    dish.name = name
    dish.pizza_diameter = pizza_diameter
    dish.price = price
    dish.restaurant_id = restaurant_id
    dish.sauces = sauces
    
    db.session.commit()

    return dish_schema.jsonify(dish)

@app.route('/dish/<id>', methods=["DELETE"])
def delete_dish(id):
    dish = Dish.query.get(id)
    db.session.delete(dish)
    db.session.commit()
    return jsonify("Dish " + id + " was succesfully deleted!")