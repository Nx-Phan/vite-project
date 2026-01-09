from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash
from database import db
from database import User, UserSettings, Video, VideoStats, UserAverages

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:password@localhost/vb_app"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Connect SQLAlchemy to Flask
db.init_app(app)

@app.route("/")
def hello_world():
    return "Hello World"

@app.route("/test-user")
def test_user():
    user = User(username="testuser", email="test@test.com")
    db.session.add(user)
    db.session.commit()
    return "User added"

@app.route("/api/test")
def test():
    return {"message": "Flask connected to React"}

@app.route("/api/createAccount", methods=["POST"])
def createAccount():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    if User.query.filter(
        (User.username == username) | (User.email == email)
    ).first():
        return jsonify({"error": "User already exists"}), 409
    
    password_hash = generate_password_hash(password)

    new_user = User(
        username = username,
        email = email,
        pass_hash = password_hash
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Account created successfully",
        "user_id": new_user.id
    }), 201



@app.route("/api/stats/<int:user_id>", methods=["GET"])
def getStats(user_id):
    avg = UserAverages.query.filter_by(user_id=user_id).first()

    if not avg:
        return jsonify({"error": "No averages found"}), 404

    return jsonify([
        {"attack": avg.avg_attack, 
         "defense": avg.avg_defense, 
         "setting": avg.avg_setting, 
         "serve": avg.avg_serve, 
         "block": avg.avg_block}
    ])

@app.route("/api/avatar/<int:user_id>", methods=["GET"])
def getAvatar(user_id):
    avatar = UserSettings.query.filter_by(user_id=user_id).first()

    if not avatar:
        return jsonify({"error": "No avatar found"}), 404
    
    return jsonify([
        {"hair": avatar.hair,
         "eye": avatar.eye,
         "mouth": avatar.mouth
        }
    ])
 

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
