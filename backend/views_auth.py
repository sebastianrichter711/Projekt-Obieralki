@app.route('/forgot-password', methods=['POST'])
def forgot_password():

@app.route('/login', methods=['POST'])
def login():

@app.route('/logout', methods=['POST'])
def logout():

@app.route('/reset-password', methods=['POST'])
def reset_password():

@app.route('/register', methods=['POST'])
def register():
    username=request.json['username']
    password=request.json['password']

    
    
    